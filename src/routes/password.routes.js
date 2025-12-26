import express from "express";
import {  forgotPassword} from forgotPassword.controller.js
import { resetPassword} from resetPassword.controller.js
 
const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
