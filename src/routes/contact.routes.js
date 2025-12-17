import express from "express";
import {
  createContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", createContact);              // Public
router.get("/", getContacts);                 // Admin
router.put("/:id", updateContactStatus);      // Admin

export default router;
  