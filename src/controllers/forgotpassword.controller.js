import crypto from "crypto";
import User from "../models/User.js";
import { transporter } from "../config/nodemailer.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // 🔐 Do not reveal user existence
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If email exists, reset link has been sent",
      });
    }

    // 1️⃣ Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 2️⃣ Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // 3️⃣ Optional: generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 4️⃣ Save to DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 min
    user.resetPasswordCode = resetCode; // optional but recommended
    await user.save();

    // 5️⃣ FRONTEND reset link (IMPORTANT)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // 6️⃣ Send email
    await transporter.sendMail({
      to: user.email,
      from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
      subject: "Admin Password Reset",
      html: `
        <h2>Password Reset</h2>
        <p>Your temporary code: <b>${resetCode}</b></p>
        <p>This code is valid for 10 minutes.</p>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Forgot password failed",
    });
  }
};
