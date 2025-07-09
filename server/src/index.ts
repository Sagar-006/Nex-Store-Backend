import express, { json } from "express";
import connectDB from "./db/db";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import productRoute from './routes/productRoute'
import { authToken } from "./middlewares/authToken";
dotenv.config(); 

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/user',userRoute);
app.use("/api/user/products" ,productRoute);


connectDB();
app.listen(PORT);