// import User from "../models/User.js";
// import bcrypt from "bcryptjs";

// export const registerUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // 🔐 Protect admin registration
    if (adminSecret !== process.env.ADMIN_REGISTER_SECRET) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized admin registration",
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};
