import mongoose, { model, Schema }  from "mongoose";
import { ICart } from "../types/types";


export const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: { type: Number, default:1, required: true },
  size: { type: String, enum: ["S", "M", "X", "XL"] },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  items: [cartItemSchema],
},{timestamps:true});

const Cart = mongoose.model<ICart>("carts",cartSchema);

export default Cart;