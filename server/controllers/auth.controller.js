import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import fs from "fs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
export const register = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);

    const { username, fullName, email, password, age, height, weight, gender } =
      req.body;
    const avatar = req.file;
    console.log(avatar);
    // Check if all required fields are provided
    if (
      !username ||
      !fullName ||
      !email ||
      !password ||
      !age ||
      !height ||
      !weight ||
      !gender ||
      !avatar
    ) {
      return res.status(400).json({
        message:
          "All fields (username, fullName, email, password, age, height, weight, gender, avatar) are required",
      });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (!validEmail) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (username.includes(" ") || email.includes(" ")) {
      return res
        .status(400)
        .json({ message: "Username and email cannot contain spaces" });
    }

    const uploadedResponse = (await cloudinary.uploader.upload(avatar?.path))
      .secure_url;

    if (!uploadedResponse) {
      fs.unlinkSync(avatar.path);
      return res
        .status(500)
        .json({ message: "Something went wrong during avatar upload" });
    }

    // Delete the local file after successful upload to Cloudinary
    fs.unlinkSync(avatar.path);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      fullName,
      email,
      avatar: uploadedResponse,
      password: passwordHash,
      age,
      height,
      weight,
      gender,
    });

    if (!user) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const sendUser = await User.findOne({ username }).select("-password");
    return res.status(201).json(sendUser);
  } catch (error) {
    console.log("Error in register controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const sendUser = await User.findOne({ username }).select("-password");
    return res.cookie("token", token).status(200).json(sendUser);
  } catch (error) {
    console.log("Error in login controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const logout = asyncHandler(async (req, res) => {
  return res.clearCookie("token").status(200).json("Logged out successfully");
});
