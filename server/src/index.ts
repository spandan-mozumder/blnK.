import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();
import createLogger from "./utils/logger";

const log = createLogger("Server");

import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import adminRoutes from "./routes/admin";
import uploadRoutes from "./routes/uploadRoutes";
import { stripeWebhook } from "./controllers/orderController";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "https://bln-k.vercel.app",
            process.env.CLIENT_URL || "http://localhost:5173"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,    max: 100,
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/", limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { message: "Too many auth attempts, please try again later." },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.post(
    "/api/webhook/stripe",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        log.info(`Server running on port ${PORT}`);
    });
};

startServer();

export default app;
