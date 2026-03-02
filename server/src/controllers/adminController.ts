import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/auth";
import createLogger from "../utils/logger";

const log = createLogger("Admin");

export const getSalesAnalytics = async (
    _req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const salesStats = await Order.aggregate([
            { $match: { paymentStatus: "paid" } },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: 1 },
                    totalRevenue: { $sum: "$totalAmount" },
                    avgOrderValue: { $avg: "$totalAmount" },
                },
            },
        ]);

        const recentOrders = await Order.find({ paymentStatus: "paid" })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("user", "name email")
            .lean();

        const salesByCategory = await Order.aggregate([
            { $match: { paymentStatus: "paid" } },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.product",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$productDetails.category",
                    totalSales: { $sum: "$items.quantity" },
                    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
                },
            },
            { $sort: { totalRevenue: -1 } },
        ]);

        const lowStockProducts = await Product.find({ stockQuantity: { $lte: 5 } })
            .sort({ stockQuantity: 1 })
            .limit(10)
            .lean();

        const totalProducts = await Product.countDocuments();

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailySales = await Order.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    createdAt: { $gte: sevenDaysAgo },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json({
            overview: {
                totalSales: salesStats[0]?.totalSales || 0,
                totalRevenue: salesStats[0]?.totalRevenue || 0,
                avgOrderValue: salesStats[0]?.avgOrderValue || 0,
                totalProducts,
            },
            recentOrders,
            salesByCategory,
            lowStockProducts,
            dailySales,
        });
    } catch (error) {
        log.error("Failed to fetch analytics", error);
        res.status(500).json({ message: "Server error fetching analytics" });
    }
};

export const getAllOrders = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;
        const status = req.query.status as string;

        const query: Record<string, any> = {};
        if (status) {
            query.paymentStatus = status;
        }

        const [orders, totalCount] = await Promise.all([
            Order.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("user", "name email")
                .lean(),
            Order.countDocuments(query),
        ]);

        res.json({
            orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
            },
        });
    } catch (error) {
        log.error("Failed to fetch orders", error);
        res.status(500).json({ message: "Server error" });
    }
};
