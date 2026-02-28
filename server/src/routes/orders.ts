import { Router } from "express";
import {
    createCheckoutSession,
    verifyPayment,
    getOrderHistory,
} from "../controllers/orderController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/checkout", authenticate, createCheckoutSession);
router.post("/verify-payment", authenticate, verifyPayment);
router.get("/history", authenticate, getOrderHistory);

export default router;
