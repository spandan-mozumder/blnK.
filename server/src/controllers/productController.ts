import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/auth";

export const getProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 12;
        const skip = (page - 1) * limit;
        const sortBy = (req.query.sortBy as string) || "createdAt";
        const order = (req.query.order as string) === "asc" ? 1 : -1;
        const category = req.query.category as string;
        const search = req.query.search as string;

        const query: Record<string, any> = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const sortObj: Record<string, 1 | -1> = {};
        sortObj[sortBy] = order;

        const [products, totalCount] = await Promise.all([
            Product.find(query)
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .lean(),
            Product.countDocuments(query),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            products,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({ message: "Server error fetching products" });
    }
};

export const getProductById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json({ product });
    } catch (error) {
        console.error("Get product error:", error);
        res.status(500).json({ message: "Server error fetching product" });
    }
};

export const createProduct = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { title, description, price, category, stockQuantity, image } =
            req.body;

        const product = new Product({
            title,
            description,
            price,
            category,
            stockQuantity,
            image: image || "",
        });

        await product.save();

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: "Server error creating product" });
    }
};

export const updateProduct = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Server error updating product" });
    }
};

export const deleteProduct = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Server error deleting product" });
    }
};

export const getCategories = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const categories = [
            "vinyl",
            "cd",
            "cassette",
            "merchandise",
            "equipment",
            "accessories",
        ];
        res.json({ categories });
    } catch (error) {
        console.error("Get categories error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
