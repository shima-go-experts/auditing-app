// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";
// import processRoutes from "./routes/process.routes.js";
// import solutionRoutes from "./routes/solution.routes.js";
// import contactRoutes from "./routes/contact.routes.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/services", serviceRoutes);
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

dotenv.config();

const startServer = async () => {
  try {
    // 1️⃣ Connect to MongoDB and wait until ready
    await connectDB();

    // 2️⃣ Initialize Express
    const app = express();
    app.use(cors());
    app.use(express.json());

    // 3️⃣ Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/services", serviceRoutes);
    app.use("/api/process", processRoutes);
    app.use("/api/solutions", solutionRoutes);
    app.use("/api/contact", contactRoutes);

    app.get("/", (req, res) => res.send("API running 🚀"));

    // 4️⃣ Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running at http://127.0.0.1:${PORT}/`)
    );
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1); // exit only if DB connection fails in production
  }
};

// 5️⃣ Start the server
startServer();
