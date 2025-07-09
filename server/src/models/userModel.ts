import mongoose, { model } from "mongoose";

const user = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("users", user);

export default User;
