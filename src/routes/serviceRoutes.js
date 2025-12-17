import express from "express";
import * as controller from "../controllers/service.controller.js";

const router = express.Router();

// PUBLIC
router.get("/", controller.getServices);
router.get("/:id", controller.getServiceById);

// ADMIN
router.post("/", controller.createService);
router.put("/:id", controller.updateService);
router.delete("/:id", controller.deleteService);

export default router;
