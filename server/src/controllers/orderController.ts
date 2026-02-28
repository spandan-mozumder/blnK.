import { Request, Response } from "express";
import Stripe from "stripe";
import Product from "../models/Product";
import Order from "../models/Order";
import { AuthRequest } from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil" as Stripe.LatestApiVersion,
});

interface CartItem {
    productId: string;
    quantity: number;
}

export const createCheckoutSession = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { items } = req.body as { items: CartItem[] };

        if (!items || items.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }

        const productIds = items.map((item) => item.productId);
        const products = await Product.find({ _id: { $in: productIds } }).lean();

        if (products.length !== items.length) {
            res.status(400).json({ message: "Some products not found" });
            return;
        }

        const orderItems = [];
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        for (const item of items) {
            const product = products.find(
                (p) => p._id.toString() === item.productId
            );

            if (!product) {
                res.status(400).json({ message: `Product ${item.productId} not found` });
                return;
            }

            if (product.stockQuantity < item.quantity) {
                res.status(400).json({
                    message: `Insufficient stock for "${product.title}". Available: ${product.stockQuantity}`,
                });
                return;
            }

            if (product.stockQuantity === 0) {
                res.status(400).json({
                    message: `"${product.title}" is out of stock`,
                });
                return;
            }

            orderItems.push({
                product: product._id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                image: product.image,
            });

            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.title,
                        description: product.description.substring(0, 200),
                        images: product.image ? [product.image] : [],
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: item.quantity,
            });
        }

        const totalAmount = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = new Order({
            user: req.user!._id,
            items: orderItems,
            totalAmount,
            paymentStatus: "pending",
        });

        await order.save();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
            metadata: {
                orderId: order._id.toString(),
                userId: req.user!._id.toString(),
            },
        });

        order.stripeSessionId = session.id;
        await order.save();

        res.json({
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ message: "Server error creating checkout session" });
    }
};

export const verifyPayment = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            res.status(400).json({ message: "Session ID is required" });
            return;
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const order = await Order.findOne({ stripeSessionId: sessionId });

        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }

        if (order.paymentStatus === "paid") {
            res.json({ message: "Payment already verified", order });
            return;
        }

        if (session.payment_status === "paid") {
            order.paymentStatus = "paid";
            order.stripePaymentIntentId = session.payment_intent as string;
            await order.save();

            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stockQuantity: -item.quantity },
                });
            }

            res.json({
                message: "Payment verified successfully",
                order,
            });
        } else {
            order.paymentStatus = "failed";
            await order.save();
            res.status(400).json({ message: "Payment not completed" });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ message: "Server error verifying payment" });
    }
};

export const stripeWebhook = async (
    req: Request,
    res: Response
): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const order = await Order.findOne({
                stripeSessionId: session.id,
            });

            if (order && order.paymentStatus !== "paid") {
                order.paymentStatus = "paid";
                order.stripePaymentIntentId = session.payment_intent as string;
                await order.save();

                for (const item of order.items) {
                    await Product.findByIdAndUpdate(item.product, {
                        $inc: { stockQuantity: -item.quantity },
                    });
                }
            }
        } catch (error) {
            console.error("Webhook processing error:", error);
        }
    }

    res.json({ received: true });
};

export const getOrderHistory = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [orders, totalCount] = await Promise.all([
            Order.find({ user: req.user!._id })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Order.countDocuments({ user: req.user!._id }),
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
        console.error("Order history error:", error);
        res.status(500).json({ message: "Server error fetching orders" });
    }
};
