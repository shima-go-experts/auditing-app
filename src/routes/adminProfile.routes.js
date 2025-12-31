import express from "express";
import Admin from "../models/Admin.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* ================================
   CREATE ADMIN (WITH AVATAR)
================================ */
router.post(
  "/",
  upload.single("avatar"), // ✅ Multer added
  async (req, res) => {
    try {
      const { name, email, role } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const admin = await Admin.create({
        name,
        email,
        role,
        avatar: req.file ? `/uploads/${req.file.filename}` : "",
      });

      res.status(201).json({
        success: true,
        data: admin,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

/* ================================
   UPDATE AVATAR ONLY
================================ */

router.put(
  "/:id/avatar",
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Avatar file is required",
        });
      }

      const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        { avatar: `/uploads/${req.file.filename}` },
        { new: true }
      );

      res.json({
        success: true,
        message: "Avatar updated successfully",
        data: admin,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default router;
