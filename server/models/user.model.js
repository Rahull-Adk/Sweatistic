import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    avatar: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    goal: {
      type: String,
    },
    workoutHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workout",
      },
    ],
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
