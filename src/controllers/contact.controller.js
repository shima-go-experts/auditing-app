// import Contact from "../models/Contact.model.js";

// /* ---------------- CREATE CONTACT (PUBLIC) ---------------- */
// export const createContact = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and message are required",
//       });
//     }

//     const contact = await Contact.create({ name, email, message });

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: contact,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /* ---------------- GET CONTACTS (ADMIN) ---------------- */
// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: contacts,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /* ---------------- UPDATE CONTACT STATUS (ADMIN) ---------------- */
// export const updateContactStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: contact,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


// import Contact from "../models/Contact.model.js";
// import { transporter } from "../config/nodemailer.js";
// import dotenv from "dotenv";

// dotenv.config();

// /* ---------------- CREATE CONTACT (PUBLIC) ---------------- */
// export const createContact = async (req, res) => {
//   try {
//     const { name, email, message, captchaToken } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and message are required",
//       });
//     }

//     if (!captchaToken) {
//       return res.status(400).json({
//         success: false,
//         message: "Captcha token missing",
//       });
//     }

//     /* 🔐 VERIFY reCAPTCHA */
//     const captchaRes = await fetch(
//       "https://www.google.com/recaptcha/api/siteverify",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
//       }
//     );

//     const captchaData = await captchaRes.json();

//     if (!captchaData.success) {
//       return res.status(400).json({
//         success: false,
//         message: "Captcha verification failed",
//       });
//     }

//     /* 💾 SAVE TO DATABASE */
//     const contact = await Contact.create({
//       name,
//       email,
//       message,
//     });

//     /* 📧 SEND EMAIL */
//     await transporter.sendMail({
//       from: `"Website Contact" <${process.env.FROM_EMAIL}>`,
//       to: process.env.FROM_EMAIL,
//       replyTo: email,
//       subject: `New Contact Message from ${name}`,
//       html: `
//         <h2>New Contact Message</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong><br/>${message}</p>
//       `,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: contact,
//     });
//   } catch (error) {
//     console.error("CONTACT ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /* ---------------- GET CONTACTS (ADMIN) ---------------- */
// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: contacts });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* ---------------- UPDATE STATUS (ADMIN) ---------------- */
// export const updateContactStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found",
//       });
//     }

//     res.json({ success: true, data: contact });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import Contact from "../models/Contact.model.js";
import { transporter } from "../config/nodemailer.js";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

/* ---------------- CREATE CONTACT (PUBLIC) ---------------- */
export const createContact = async (req, res) => {
  try {
    const { name, email, message, captchaToken } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: "Captcha token missing",
      });
    }

    /* 🔐 VERIFY reCAPTCHA */
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      }
    );

    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    /* 💾 SAVE TO DATABASE */
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    /* 📧 SEND EMAIL */
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.FROM_EMAIL,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
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
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ---------------- UPDATE STATUS (ADMIN) ---------------- */
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatus = ["new", "read", "replied"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

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

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
