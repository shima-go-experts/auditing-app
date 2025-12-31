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


// controllers/adminProfile.controller.js
import Admin from "../models/Admin.js";

/* ===============================
   GET ADMIN PROFILE
================================ */
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===============================
   UPDATE NAME & EMAIL
================================ */
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===============================
   UPLOAD PROFILE IMAGE
================================ */
export const uploadAdminAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const avatarPath = `/uploads/admin/${req.file.filename}`;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { avatar: avatarPath },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile image updated",
      avatar: admin.avatar,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};
