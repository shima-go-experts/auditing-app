import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    status: { type: String, default: "published" },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service; // ✅ This fixes the "no default export" error
