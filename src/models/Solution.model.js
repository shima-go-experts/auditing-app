import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
       // store icon name (e.g., ShieldCheck)
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Solution", SolutionSchema);
