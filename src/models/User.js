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
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔐 never return password by default
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    // 🔁 Forgot / Reset password support
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error (important for nodemon / Next.js)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
