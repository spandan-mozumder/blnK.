import { Router } from "express";
import {
    getSalesAnalytics,
    getAllOrders,
} from "../controllers/adminController";
import { authenticate, authorizeAdmin } from "../middleware/auth";

const router = Router();

router.get("/analytics", authenticate, authorizeAdmin, getSalesAnalytics);
router.get("/orders", authenticate, authorizeAdmin, getAllOrders);

export default router;
