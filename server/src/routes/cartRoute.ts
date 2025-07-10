import express from 'express';
import { authToken } from '../middlewares/authToken';
import { addToCart, getAllCartItems, updateCartItems } from '../controllers/cartController';

const router = express.Router();

router.get("/", authToken, getAllCartItems);
router.post("/addtocart",authToken,addToCart);
router.put("/:productId", authToken, updateCartItems);



export default router;