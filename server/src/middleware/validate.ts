import { body, query } from "express-validator";

export const registerValidation = [
    body("name")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Please enter a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
];

export const productValidation = [
    body("title")
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage("Title is required and must be under 200 characters"),
    body("description")
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage("Description is required and must be under 2000 characters"),
    body("price")
        .isFloat({ min: 0.01 })
        .withMessage("Price must be a positive number"),
    body("category")
        .isIn([
            "vinyl",
            "cd",
            "cassette",
            "merchandise",
            "equipment",
            "accessories",
        ])
        .withMessage("Invalid category"),
    body("stockQuantity")
        .isInt({ min: 0 })
        .withMessage("Stock quantity must be a non-negative integer"),
];

export const productUpdateValidation = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage("Title must be under 200 characters"),
    body("description")
        .optional()
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage("Description must be under 2000 characters"),
    body("price")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Price must be a positive number"),
    body("category")
        .optional()
        .isIn([
            "vinyl",
            "cd",
            "cassette",
            "merchandise",
            "equipment",
            "accessories",
        ])
        .withMessage("Invalid category"),
    body("stockQuantity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock quantity must be a non-negative integer"),
];

export const productQueryValidation = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),
    query("limit")
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage("Limit must be between 1 and 50"),
    query("sortBy")
        .optional()
        .isIn(["price", "createdAt", "title"])
        .withMessage("Invalid sort field"),
    query("order")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("Order must be asc or desc"),
    query("category")
        .optional()
        .isIn([
            "vinyl",
            "cd",
            "cassette",
            "merchandise",
            "equipment",
            "accessories",
        ])
        .withMessage("Invalid category filter"),
];
