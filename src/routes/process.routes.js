import express from "express";
import {
  createProcessStep,
  getProcessSteps,
  getProcessStepById,
  updateProcessStep,
  deleteProcessStep,
} from "../controllers/process.controller.js";

const router = express.Router();

router.post("/", createProcessStep);
router.get("/", getProcessSteps);
router.get("/:id", getProcessStepById);
router.put("/:id", updateProcessStep);
router.delete("/:id", deleteProcessStep);

export default router;
