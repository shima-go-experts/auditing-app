// import User from "../models/User.js";

// export const verifyEmail = async (req, res) => {
//   const { token } = req.params;

//   const user = await User.findOne({
//     emailVerifyToken: token,
//     emailVerifyExpires: { $gt: Date.now() },
//   });

//   if (!user)
//     return res.status(400).json({ message: "Invalid or expired token" });

//   user.ensuringVerified = true;
//   user.emailVerifyToken = undefined;
//   user.emailVerifyExpires = undefined;
//   await user.save();

//   res.json({ success: true, message: "Email verified successfully" });
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2️⃣ Find admin (explicitly select password)
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
