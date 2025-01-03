import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    picture: {
      type: String,
      required: false,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.name
        )}`;
      },
    },
    age: {
      type: Number,
      required: false,
      min: [0, "Age must be a positive number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
      default: null,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    phone: {
      type: String,
      required: false,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
      default: null,
    },
    userType: {
      type: String,
      enum: ["student", "mentor"], // Enum values
      required: true,
      default: "student", // Default value
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
