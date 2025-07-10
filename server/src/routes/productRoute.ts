import express from 'express'
import { authToken } from '../middlewares/authToken';
import { deleteProduct, filterProduct, getAllProducts, getProductById, productController, updateProduct } from '../controllers/productController';

const router = express.Router();

router.get("/category/:name", filterProduct);
router.post("/addproduct",authToken,productController);
router.put("/:id", authToken, updateProduct);
router.delete("/:id", authToken, deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);


export default router;