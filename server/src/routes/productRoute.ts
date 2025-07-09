import express from 'express'
import { authToken } from '../middlewares/authToken';
import { deleteProduct, filterProduct, getAllProducts, getProductById, productController, updateProduct } from '../controllers/productController';

const router = express.Router();


router.post("/addproduct",authToken,productController);
router.get("/", getAllProducts);
router.get("/:id",getProductById);
router.put("/:id", authToken, updateProduct);
router.delete("/:id", authToken, deleteProduct);
router.get("/category/:name", filterProduct);




export default router;