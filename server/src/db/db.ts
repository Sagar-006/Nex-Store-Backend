import dotenv from "dotenv";
dotenv.config(); 

import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

const connectDB = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("MONGO_URL is undefined!");
    }
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");
  } catch (e) {
    console.error(" DB connection error:", e);
  }
};

export default connectDB;
