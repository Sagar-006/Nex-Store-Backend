import { z } from "zod";
import { Request, response, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Users } from "../types/types";
dotenv.config();

const userSchema = z.object({
  username: z.string().min(4).max(30).trim().optional(),
  email: z.string().min(10).max(50).trim(),
  password: z.string().min(8).max(16).trim(),
});

const SALT = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = userSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: "Name or password to short",
        issues: parseResult.error.errors,
      });
      return;
    }
    const { username, email, password } = parseResult.data as Users;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "Email already exists!",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, SALT);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      role: "user",
    });

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .header("Authorization", `Bearer ${token}`)
      .status(201)
      .json({
        message: "you are signed in",
        token,
        user: {
          username: user.username,
          email: user.email,
          role:user.role,
        },
      });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });
    console.log(user);

    if (!user) {
      res.status(401).json({
        message: "User Not Exist!",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.json({
        message: "Incorrect Password!",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role:user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.header("Authorization", `Bearer ${token}`);

    res.status(201).json({
      message: "Login successfully",
      token,
      user: {
        username: user.username,
        email: user.email,
        role:user.role,
      },
    });
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
};
