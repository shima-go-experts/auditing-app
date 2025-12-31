// import multer from "multer";
// import path from "path";

// /* Storage configuration */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "src/uploads"); // save files here
//   },
//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });

// /* File filter (only images allowed) */
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files allowed"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024, // 2MB
//   },
// });

// export default upload;

import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import connectDB from "./config/db.js";
import adminProfileRoutes from "./routes/adminProfile.routes.js";

const app = express();

// CORS
app.use(cors());

// ❌ DO NOT parse multipart with express.json
app.use(express.json({ limit: "10mb" }));

// ✅ REQUIRED for file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/admin", adminProfileRoutes);

// Test
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running at http://127.0.0.1:${PORT}`)
  );
});
