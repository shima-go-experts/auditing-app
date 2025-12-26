import User from "../models/User.model.js";

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerifyToken: token,
      emailVerifyExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isEmailVerified = true;       // ✅ use correct field name
    user.emailVerifyToken = undefined; // clear token
    user.emailVerifyExpires = undefined; 
    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
