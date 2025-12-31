// // UPDATE PROFILE
// export const updateAdminProfile = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     let admin = await Admin.findOne();
//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: "Admin profile not found",
//       });
//     }

//     if (name) admin.name = name;
//     if (email) admin.email = email;

//     if (req.file) {
//       admin.avatar = `/uploads/${req.file.filename}`;
//     }

//     await admin.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: admin,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Profile update failed",
//     });
//   }
// };


import Admin from "../models/Admin.js";
import cloudinary from "../config/cloudinary.js"; // Cloudinary config
import fs from "fs";

/* ===============================
   CREATE ADMIN
================================ */
export const createAdmin = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newAdminData = { name, email, role };

    // Upload avatar if file exists
    if (req.files?.avatar) {
      const file = req.files.avatar;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "admin_avatars",
        transformation: [{ width: 400, height: 400, crop: "limit" }],
      });
      newAdminData.avatar = result.secure_url;
      fs.unlinkSync(file.tempFilePath);
    }

    const admin = await Admin.create(newAdminData);
    res.status(201).json({ success: true, message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   GET ADMIN PROFILE
================================ */
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===============================
   UPDATE ADMIN PROFILE + AVATAR
================================ */
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    if (req.files?.avatar) {
      const file = req.files.avatar;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "admin_avatars",
        transformation: [{ width: 400, height: 400, crop: "limit" }],
      });
      updateData.avatar = result.secure_url;
      fs.unlinkSync(file.tempFilePath);
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    res.json({ success: true, message: "Profile updated successfully", admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   DELETE ADMIN (optional)
================================ */
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });
    res.json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
