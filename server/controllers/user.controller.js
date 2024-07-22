import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt"; // Ensure bcrypt is imported

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-_id username");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      age,
      height,
      weight,
      gender,
      oldPassword,
      newPassword,
      email,
      username,
    } = req.body;
    const avatar = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const isEmailUnique = await User.findOne({ email });
      if (isEmailUnique) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (username && username !== user.username) {
      const isUsernameUnique = await User.findOne({ username });
      if (isUsernameUnique) {
        return res.status(400).json({ message: "Username already exists" });
      }
      user.username = username;
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      return res
        .status(400)
        .json({ message: "Both old and new passwords are required" });
    }

    if (oldPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      if (oldPassword === newPassword) {
        return res
          .status(400)
          .json({ message: "Old and new passwords cannot be the same" });
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);
      user.password = passwordHash;
    }

    if (avatar && avatar.path) {
      if (user.avatar) {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      const uploadResponse = await cloudinary.uploader.upload(avatar.path);
      user.avatar = uploadResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.age = age || user.age;
    user.height = height || user.height;
    user.weight = weight || user.weight;
    user.gender = gender || user.gender;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in update user profile controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
