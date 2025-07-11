import mongoose,{Schema} from "mongoose";
import { Iorder } from "../types/types";

const orderSchema = new Schema<Iorder>(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: String, enum: ["S", "M", "X", "XL"], required: true },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    totalAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const orders = mongoose.model<Iorder>('orders',orderSchema);
export default orders;