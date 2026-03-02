import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export interface AuthRequest extends Request {
    user?: IUser;
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ message: "Access denied. No token provided." });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            role: string;
        };

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401).json({ message: "Invalid token. User not found." });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

export const authorizeAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Access denied. Admin only." });
        return;
    }
    next();
};

export const authorizeSellerOrAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    if (req.user?.role !== "admin" && req.user?.role !== "seller") {
        res.status(403).json({ message: "Access denied. Sellers or Admins only." });
        return;
    }
    next();
};
