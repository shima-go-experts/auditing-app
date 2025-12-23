// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js"; // <-- import service routes
// import processRoutes from "./routes/process.routes.js";
// import solutionRoutes from "./routes/solution.routes.js";
// import contactRoutes from "./routes/contact.routes.js";

// dotenv.config();
// connectDB();
 
// const app = express();
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/auth/services", serviceRoutes); // <-- mount service routes
// app.use("/api/process", processRoutes);
// app.use("/api/solutions", solutionRoutes);
// app.use("/api/contact", contactRoutes);
// app.get("/", (req, res) => res.send("API running 🚀"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running at http://127.0.0.1:${PORT}/`)
// );


import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import processRoutes from "./routes/process.routes.js";
import solutionRoutes from "./routes/solution.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import { registerUser } from "./controllers/register.controller.js";
import { loginUser } from "./controllers/login.controller.js";

dotenv.config();
connectDB();

const app = express(); // ✅ CREATE APP FIRST

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/process", processRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/auth/register",registerUser);
app.use("/auth/login",loginUser)
// ✅ Health check
app.get("/", (req, res) => res.send("API running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
