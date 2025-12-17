import express from "express";
import { registerUser } from "../controllers/authController.js";
import {  loginUser } from "../controllers/authController.js"; // <-- both

const router = express.Router();

router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

export default router;
