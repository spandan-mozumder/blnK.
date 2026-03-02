import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
} from "../controllers/productController";
import { authenticate, authorizeAdmin, authorizeSellerOrAdmin } from "../middleware/auth";
import {
    productValidation,
    productUpdateValidation,
    productQueryValidation,
} from "../middleware/validate";

const router = Router();

router.get("/", productQueryValidation, getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

router.post(
    "/",
    authenticate,
    authorizeSellerOrAdmin,
    productValidation,
    createProduct
);
router.put(
    "/:id",
    authenticate,
    authorizeSellerOrAdmin,
    productUpdateValidation,
    updateProduct
);
router.delete("/:id", authenticate, authorizeSellerOrAdmin, deleteProduct);

export default router;
