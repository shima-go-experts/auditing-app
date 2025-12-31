import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, // ✅ strongly recommended
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    // 🔁 Forgot / Reset password
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },

    resetPasswordCode: {
      type: String, // ✅ REQUIRED
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
