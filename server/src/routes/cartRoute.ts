import express from 'express';
import { authToken } from '../middlewares/authToken';
import { addToCart, deleteItem, getAllCartItems, updateCartItems } from '../controllers/cartController';

const router = express.Router();

router.get("/", authToken, getAllCartItems);
router.post("/addtocart",authToken,addToCart);
router.put("/:productId", authToken, updateCartItems);
router.delete("/:productId", authToken, deleteItem);




export default router;