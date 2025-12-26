import express from "express";
import { registerUser } from "../controllers/register.controller.js";
import { loginUser } from "../controllers/login.controller.js";
import { forgotPassword } from "../controllers/forgotpassword.controller.js";
import { resetPassword } from "../controllers/resetpassword.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

// ✅ TOKEN MUST BE IN URL
router.post("/reset-password/:token", resetPassword);

export default router;
