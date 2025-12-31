// import crypto from "crypto";
// import User from "../models/User.js";
// import { resend } from "../config/resend.js";

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOne({
//       email: email.toLowerCase().trim(),
//     });

//     // 🔐 Do not reveal user existence
//     if (!user) {
//       return res.status(200).json({
//         success: true,
//         message: "If email exists, reset link has been sent",
//       });
//     }

//     // 1️⃣ Generate reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");

//     // 2️⃣ Hash token
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     // 3️⃣ 6-digit code
//     const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

//     // 4️⃣ Save to DB
//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
//     user.resetPasswordCode = resetCode;
//     await user.save();

//     // 5️⃣ Reset URL
//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     // 6️⃣ Send email via Resend
//     await resend.emails.send({
//       from: "Admin Panel <onboarding@resend.dev>", // change after domain verify
//       to: user.email,
//       subject: "Admin Password Reset",
//       html: `
//         <h2>Password Reset</h2>
//         <p>Your temporary code: <b>${resetCode}</b></p>
//         <p>This code is valid for 10 minutes.</p>
//         <p>Click below to reset your password:</p>
//         <a href="${resetUrl}">${resetUrl}</a>
//       `,
//     });
// console.log("RESEND RESULT:", result);

//     res.status(200).json({
//       success: true,
//       message: "Password reset link sent to email",
//     });

//   } catch (error) {
//     console.error("FORGOT PASSWORD ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Forgot password failed",
//     });
//   }
// };


import crypto from "crypto";
import User from "../models/User.js";
import { resend } from "../config/resend.js";

export const forgotPassword = async (req, res) => {
  console.log("🔥 FORGOT PASSWORD API HIT");

  try {
    const { email } = req.body;
    console.log("1️⃣ Email received:", email);

    if (!email) {
      console.log("❌ Email missing");
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    console.log("2️⃣ User found:", !!user);

    if (!user) {
      console.log("⚠️ User not found");
      return res.status(200).json({ success: true, message: "If email exists, reset link has been sent" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    user.resetPasswordCode = resetCode;
    await user.save();
    console.log("3️⃣ User saved with reset token");

    // Reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email with try-catch
    console.log("4️⃣ Sending email...");
    try {
      const result = await resend.emails.send({
        from: "Admin Panel <onboarding@resend.dev>", // default verified
        to: user.email,
        subject: "Admin Password Reset",
        html: `<h2>Password Reset</h2>
               <p>Your temporary code: <b>${resetCode}</b></p>
               <p>Click to reset: <a href="${resetUrl}">${resetUrl}</a></p>`
      });
      console.log("✅ RESEND RESULT:", result);
    } catch (emailError) {
      console.error("❌ EMAIL SEND ERROR:", emailError);
      return res.status(500).json({ success: false, message: "Email sending failed" });
    }

    return res.status(200).json({ success: true, message: "Password reset link sent to email" });

  } catch (error) {
    console.error("❌ FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({ success: false, message: "Forgot password failed" });
  }
};
