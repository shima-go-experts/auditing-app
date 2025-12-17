import Contact from "../models/Contact.model.js";

/* ---------------- CREATE CONTACT (PUBLIC) ---------------- */
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- GET CONTACTS (ADMIN) ---------------- */
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- UPDATE CONTACT STATUS (ADMIN) ---------------- */
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
