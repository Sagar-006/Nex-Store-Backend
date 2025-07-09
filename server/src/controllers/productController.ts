import { Request,Response,NextFunction } from "express"
import productschema from "../models/productSchema";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

export const productController = async(req:Request,res:Response,next:NextFunction): Promise<void> => {
    // @ts-ignore
    const user = req.user;
    if(!user){
        res.status(401).json({
            message:"Unauthorized!"
        })
    }

    if (user.role === "admin") {      
    try{    
            const { name, description,price,category,image,size} = req.body;

            const newProduct = await productschema.create({
                name,
                description,
                price,
                category,
                image,
                size,
            })
            console.log(newProduct)
        
        res.status(201).json({
            userId:user._id,
            role:user.role,
            
        })

    }
    catch(e){
        res.json({
            error:e
        })
    }   
}  else{
    res.json({
        message:"You are not Admin!"
    })
}
}

export const getAllProducts = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const response = await productschema.find();

        res.status(200).json({
            message:"All products",
            response:response
        })
    }
    catch(e){
        res.status(500).json({
            message:"Failed to fetch products!",
            error:e
        })
    }
}

export const getProductById = async(req:Request,res:Response) => {
    try{
        const product = await productschema.findById(req.params.id);
    if(!product){
        res.status(404).json({
            message:"Product Not Found!"
        })
    }
    res.status(200).json({
        product
    });
    }
    catch(e){
        res.status(500).json({
            message:"Error fetching product",
            error:e
        })
    }
}

export const updateProduct = async(req:Request,res:Response) =>{
    // @ts-ignore
    const user = req.user;
    if(user.role === "admin"){
        try {
          const productId = req.params.id;
          const updatedData = req.body;

          const updatedProduct = await productschema.findByIdAndUpdate(
            productId,
            updatedData,
            { new: true, runValidators: true }
          );

          if (!updatedProduct) {
            res.status(404).json({ messages: "product not found!" });
          }
          res.status(200).json({
            message: "Product updated successfully!",
            product: updatedData,
          });
        } catch (e) {
          res.status(500).json({
            message: "Failed to update a product!",
          });
        }
    }else{
        res.status(400).json({
            message:"You are not admin"
        })
    }
}

export const deleteProduct = async(req:Request,res:Response) =>{
    // @ts-ignore
    const user = req.user;
    if(user.role === "admin"){
    try{
        const productId = req.params.id;

        const deletedProduct = await productschema.findByIdAndDelete(productId);

        res.status(201).json({
            message:"Product deleted Successfully!"
        })
    }
    catch(e){
        res.status(500).json({
            message:"Something went Wrong!"
        })
    }
}else{
    res.status(400).json({
        message:"You are not Admin!"
    })
}

}

export const filterProduct = async (req: Request, res: Response): Promise<void> => {
  

  try {
    const category = req.params.name;
    const filtredProduct = await productschema.find({category});

    res.status(200).json({
      message: "filtered products!",
      response: filtredProduct,
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed filter products!",
      error: e,
    });
  }
};