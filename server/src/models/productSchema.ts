import mongoose from "mongoose";
import { IProduct } from "../types/types";

 const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category:{type:String,required:true},
  image:{type:String,required:true},
  size:{type:String,required:true},
  createdAt:{type:Date,default:Date.now},
},{
    timestamps:true,
});

const productschema = mongoose.model("products",productSchema);
export default productschema;