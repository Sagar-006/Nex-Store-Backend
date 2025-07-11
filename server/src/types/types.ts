import mongoose from "mongoose";

export interface Users {
  username: string;
  email:string;
  password: string;
  role:"user" | "admin";
}

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: "MEN"|"WOMEN";
  size:'S'|'M'|'L'|'XL';
  createdAt?:Date;
}


export interface ICartItem {
  productId:mongoose.Schema.Types.ObjectId;
  quantity:number;
  size?:"S"|"M"|"X"|"XL";
}

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  productId:string;
  quantity:number;
  size:'S'|'M'|'X'|'XL'
}

export interface Iorder {
  userId:String;
  items:IOrderItem[];
  shippingAddress:{
    street:string;
    city:string;
    zip:string;
  },
  totalAmount:number;
  status:'Processing'|'Shipped'|'Delivered'|'Cancelled';
  createdAt?:Date;
}