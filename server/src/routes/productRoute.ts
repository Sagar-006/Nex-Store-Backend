import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken';
import { productController } from '../controllers/productController';

const router = express.Router();


router.get("/demo",authenticateToken,productController);

export default router;