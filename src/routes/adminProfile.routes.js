// import express from "express";
// import Admin from "../models/Admin.js";
// import upload from "../middlewares/upload.js";

// const router = express.Router();

// /* ================================
//    CREATE ADMIN (WITH AVATAR)
// ================================ */
// router.post(
//   "/",
//   upload.single("avatar"),
//   async (req, res) => {
//     try {
//       const { name, email, role } = req.body;

//       if (!email) {
//         return res.status(400).json({
//           success: false,
//           message: "Email is required",
//         });
//       }

//       const admin = await Admin.create({
//         name,
//         email,
//         role,
//         avatar: req.file ? `/uploads/${req.file.filename}` : "",
//       });

//       res.status(201).json({
//         success: true,
//         data: admin,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   }
// );

// /* ================================
//    UPDATE PROFILE (ALL FIELDS)
// ================================ */

// router.put(
//   "/:id",
//   upload.single("avatar"), // avatar is optional
//   async (req, res) => {
//     try {
//       const { name, email, role } = req.body;

//       const updateData = {};
//       if (name) updateData.name = name;
//       if (email) updateData.email = email;
//       if (role) updateData.role = role;
//       if (req.file) updateData.avatar = `/uploads/${req.file.filename}`;

//       const admin = await Admin.findByIdAndUpdate(req.params.id, updateData, {
//         new: true,
//       });

//       if (!admin) {
//         return res.status(404).json({
//           success: false,
//           message: "Admin not found",
//         });
//       }

//       res.json({
//         success: true,
//         message: "Profile updated successfully",
//         admin,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   }
// );

// export default router;

import express from "express";
import Admin from "../models/Admin.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* ================================
   CREATE ADMIN (WITH AVATAR)
================================ */
router.post(
  "/",
  upload.single("avatar"),
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
        name: name || "",
        email,
        role: role || "Administrator",
        avatar: req.file ? `/uploads/${req.file.filename}` : "",
      });

      res.status(201).json({
        success: true,
        admin,
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
   UPDATE ADMIN PROFILE (ALL FIELDS)
================================ */
router.put(
  "/:id",
  upload.single("avatar"), // avatar optional
  async (req, res) => {
    try {
      const { name, email, role } = req.body;

      const updateData = {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(req.file && { avatar: `/uploads/${req.file.filename}` }),
      };

      const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      res.json({
        success: true,
        message: "Profile updated successfully",
        admin,
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
