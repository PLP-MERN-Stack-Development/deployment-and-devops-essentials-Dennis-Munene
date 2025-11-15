require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(helmet()); // secure HTTP headers
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  })
);
app.use(morgan("dev")); // logging requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/health", healthRoutes);

// Health check
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
