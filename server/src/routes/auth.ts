import { Router } from "express";
import {
    register,
    login,
    getProfile,
    createAdmin,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";
import {
    registerValidation,
    loginValidation,
} from "../middleware/validate";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", authenticate, getProfile);
router.post("/create-admin", registerValidation, createAdmin);

export default router;
