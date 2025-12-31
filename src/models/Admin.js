import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      
      lowercase: true,
    },

    avatar: {
      type: String, // image URL
      default: "",
    },

    role: {
      type: String,
      default: "Administrator",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);

