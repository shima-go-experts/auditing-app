import express from "express";
import {
  createSolution,
  getSolutions,
  getSolutionById,
  updateSolution,
  deleteSolution,
} from "../controllers/solution.controller.js";

const router = express.Router();

router.post("/", createSolution);
router.get("/", getSolutions);
router.get("/:id", getSolutionById);
router.put("/:id", updateSolution);
router.delete("/:id", deleteSolution);

export default router;
