import mongoose, { model } from "mongoose";

const user = new mongoose.Schema({
  username: { type: String, required: true,unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
},{
    versionKey:false
});

const User = mongoose.model("users",user);


export default User; 