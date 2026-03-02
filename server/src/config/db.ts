import mongoose from "mongoose";
import dotenv from "dotenv";
import createLogger from "../utils/logger";

dotenv.config();

const log = createLogger("Database");

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        await mongoose.connect(uri);
        log.info("MongoDB connected successfully");
    } catch (error) {
        log.error("MongoDB connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
