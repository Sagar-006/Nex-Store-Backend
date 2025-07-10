import express, { json } from "express";
import connectDB from "./db/db";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import productRoute from './routes/productRoute';
import cartRoute from './routes/cartRoute';
dotenv.config(); 

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/user',userRoute);
app.use("/api/user/products" ,productRoute);
app.use("/api/user/product/cart", cartRoute);



connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});