import { Router, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { authenticate, authorizeSellerOrAdmin } from "../middleware/auth";
import createLogger from "../utils/logger";

const log = createLogger("Upload");
const router = Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

router.post(
    "/",
    authenticate,
    authorizeSellerOrAdmin,
    (req: Request, res: Response): void => {
        upload.single("image")(req, res, async (err) => {
            if (err) {
                log.error("Multer upload failed", err.message);
                res.status(400).json({ message: "Image upload failed", error: err.message });
                return;
            }

            if (!req.file) {
                res.status(400).json({ message: "No image file provided" });
                return;
            }

            try {
                const result = await new Promise<any>((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: "spandan-store" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    ).end(req.file!.buffer);
                });

                log.info("Image uploaded successfully", { url: result.secure_url });
                res.json({
                    message: "Image uploaded successfully",
                    imageUrl: result.secure_url,
                });
            } catch (cloudinaryError: any) {
                log.error("Cloudinary upload failed", cloudinaryError.message);
                res.status(500).json({ message: "Image upload failed", error: cloudinaryError.message });
            }
        });
    }
);

export default router;
