import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";
import createLogger from "../utils/logger";

const log = createLogger("Auth");

const generateToken = (userId: string, role: string): string => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
};

export const register = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists with this email" });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        await user.save();

        const token = generateToken(user._id.toString(), user.role);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        log.error("Registration failed", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const token = generateToken(user._id.toString(), user.role);

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        log.error("Login failed", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

export const getProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        res.json({
            user: {
                id: req.user!._id,
                name: req.user!.name,
                email: req.user!.email,
                role: req.user!.role,
            },
        });
    } catch (error) {
        log.error("Failed to fetch profile", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createAdmin = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists with this email" });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });

        await user.save();

        const token = generateToken(user._id.toString(), user.role);

        res.status(201).json({
            message: "Admin created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        log.error("Admin creation failed", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const becomeSeller = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { storeName, description } = req.body;

        if (!storeName || !description) {
            res.status(400).json({ message: "Store name and description are required" });
            return;
        }

        const user = await User.findById(req.user!._id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (user.role === "admin") {
            res.status(400).json({ message: "Admins cannot become sellers" });
            return;
        }

        if (user.role === "seller") {
            res.status(400).json({ message: "User is already a seller" });
            return;
        }

        user.role = "seller";
        user.sellerDetails = {
            storeName,
            description,
        };

        await user.save();

        const token = generateToken(user._id.toString(), user.role);

        res.json({
            message: "Successfully upgraded to seller account",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                sellerDetails: user.sellerDetails,
            },
        });
    } catch (error) {
        log.error("Become seller failed", error);
        res.status(500).json({ message: "Server error" });
    }
};
