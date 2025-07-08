import { Request,Response,NextFunction } from "express"
export const productController = async(req:Request,res:Response,next:NextFunction) => {
    res.json({
        message:"this is productPage"
    }) 
    console.log(req.headers['authorization']);
}