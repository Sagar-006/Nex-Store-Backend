import express from 'express';
import { authToken } from '../middlewares/authToken';
import { createOrder, getAllOrders, getSingleOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/',authToken, createOrder);
router.get("/getallorders", authToken, getAllOrders);
router.get("/:id",authToken,getSingleOrder)


export default router;