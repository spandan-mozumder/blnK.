import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    category: string;
    stockQuantity: number;
    image: string;
    seller: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
            maxlength: [200, "Title must not exceed 200 characters"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            maxlength: [2000, "Description must not exceed 2000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            enum: {
                values: [
                    "vinyl",
                    "cd",
                    "cassette",
                    "merchandise",
                    "equipment",
                    "accessories",
                ],
                message: "{VALUE} is not a valid category",
            },
        },
        stockQuantity: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock quantity cannot be negative"],
            default: 0,
        },
        image: {
            type: String,
            default: "",
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Seller is required"],
        },
    },
    {
        timestamps: true,
    }
);

productSchema.index({ title: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ seller: 1 });

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
