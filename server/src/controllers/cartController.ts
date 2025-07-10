import { Response,Request,NextFunction } from "express"
import productschema from "../models/productSchema";
import Cart from "../models/addToCart";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
export const addToCart = async(req:Request,res:Response,next:NextFunction):Promise<void> => {    
    try{
        const { productId, quantity, size } = req.body;
        console.log("Received productId:", productId);
        // @ts-ignore
        const user = req.user as {_id:string};
        console.log("Decoded user from token:", user);
        // @ts-ignore
        const userId = user.userId;
        if(!userId){
            res.status(401).json({
                message:"User Id Missing!"
            })
            return;
        }
        
        // Validate product exists
        const product = await productschema.findById(productId?.toString().trim());
        console.log("Product found:", product);
        if(!product){
             res.status(404).json({
                message:"Product Not Found!",
                productId
            })
            return;
        }

        let cart = await Cart.findOne({userId});

        if(cart){
        const existingItem = cart?.items.find(
            item => item.productId.toString() === productId && item.size === size
        )
    
        if(existingItem){
            existingItem.quantity += quantity; 
        }else{
            cart.items.push({productId,quantity,size})
        }
    }else{
        cart = new Cart({
            userId,
            items:[{productId,quantity,size}]
        });
    }
    await cart.save();

        res.status(200).json({
            message:"item added to cart!",
            cart
        })
        
    }
    catch(e){
        res.status(500).json({
            message:"Something Went Wrong!",
            error:e,
        });
    }

}

export const getAllCartItems = async(req:Request,res:Response,next:NextFunction):Promise<void>=> {
    try{
      // @ts-ignore
      const userId = req.user.userId;
      console.log(userId);
    //   const {cartId} = req.body;

      const findCart = await Cart.findOne({userId}).populate("items.productId");

      if (!findCart) {
        res.json({
          message: "User Not valid!",
        });
        return;
      }

      res.json({
        message: "here is all cart items",
        findCart,
      });
    }catch(e){
        console.log(e)
    }
}

export const updateCartItems = async(req:Request,res:Response,next:NextFunction) => {
    try{
      // @ts-ignore
      const userId = req.user.userId;
      const {productId} = req.params;
      const {quantity,size} = req.body;

      const cart = await Cart.findOne({userId});

      if(!cart){
        res.json({
          message: "user Not found!",
        });
      }else{

      const item = cart?.items.find(
        item => item.productId.toString() === productId
      );

      if(!item){
        res.status(404).json({
            message:"Product not found in cart!"
        });
        return;
      }

      if(quantity == 0) {
        res.json({
            message:"quantity 0 not exist!"
        })
      }else{
        item.quantity = quantity;
      }
      if(size) item.size = size;

      await cart.save();

      res.status(200).json({
        message:"Cart item updated successfully!",
        cart,
      })
    }
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message:"Something went wrong!",
            error:e,
        })
    }
} 