// import nodemailer from "nodemailer";

// import dotenv from "dotenv";
// dotenv.config();   // must be first

// export const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,                 // mail.doorstephub.com
//   port: Number(process.env.EMAIL_PORT),         // 465
//   secure: process.env.EMAIL_SECURE === "true",  // true for 465, false for 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });



import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();   // must be first

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,   // mail.doorstephub.com
  port: 587,                      // ✅ FIXED
  secure: false,                  // ✅ REQUIRED for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,    // ✅ Render-safe
  },
});