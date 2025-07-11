import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import orders from "../models/orderSchema";
import productschema from "../models/productSchema";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { items, shippingAddress } = req.body;

    console.log(req.body.items);
    if (!userId) {
      res.status(401).json({
        message: "Unauthorized!",
      });
      return;
    }

    if (!items || items.length === 0) {
      res.status(400).json({
        message: "No items in order!",
      });
      return;
    }

    // calculate total amount!
    let totalAmount = 0;

    for (const item of items) {
      const product = await productschema.findById(item.productId);
      if (!product) {
        res.status(404).json({
          message: `product not found ${item.productId}`,
        });
        return;
      }
      totalAmount += product.price * item.quantity;
    }

    // create the order!
    const newOrder = await orders.create({
      userId,
      items,
      shippingAddress,
      totalAmount,
      status: "Processing",
    });

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to create order!",
    });
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const userOrders = await orders
    .find({ userId })
    .populate("items.productId", "name price image")
    .sort({createdAt: -1});

    res.status(200).json({
        message:"User orders fetched Successfully!",
        orders:userOrders,
    })
  } catch (e) {
    res.status(500).json({
        message:"Failed to fetch orders!",
        e,
    })
  }
};

export const getSingleOrder = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const orderId = req.params.id;
        // @ts-ignore
        const userId = req.user.userId;

        if(!userId){
            res.status(401).json({
                message:"Unauthenticated!"
            });
            return;
        }

        const order =await orders.findOne({_id:orderId, userId}).populate("items.productId","name price image")
        
        if(!order){
            res.status(404).json({
                message:"Order Not Found!"
            });
            return;
        }

        res.status(200).json({
            message:"Order fetched Successfully!",
            order,
        })
    }
    catch(e){
        res.status(500).json({
            message:"Failed to fetch Order!",
            error:e,
        });

    }
}