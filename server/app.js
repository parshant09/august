const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const connectDB = require("./config/db.config");

// Import Routes
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");
const foodRoute = require("./routes/food.route"); // <-- Add food route

// Load environment variables
require("dotenv").config();

// Connect to the database
connectDB();

// Create the Express application object
const app = express();

// Middleware setup
app.use(compression()); // Compress all routes to reduce payload size
app.use(helmet()); // Apply security headers
app.use(morgan("dev")); // Log requests in development mode

// CORS setup (allow specific origins based on the environment)
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['http://3.129.44.248:3000'] // Production frontend URL
  : ['http://localhost:3000']; // Development frontend (localhost)

app.use(
  cors({
    origin: allowedOrigins, // Restrict origins based on environment
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers like Content-Type and Authorization
  })
);

// Handle preflight requests explicitly for all routes (fixes CORS issues on preflight OPTIONS requests)
app.options('*', cors()); // This will handle preflight requests for all routes

// Body parsers for handling JSON and URL-encoded data
app.use(express.json({ limit: "50mb" })); // Allow larger JSON bodies (up to 50mb)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Route setup
app.get("/", (req, res) => {
  res.send("Backend server is up and running!");
});

// Register routes
app.use("/api/food", foodRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

// General error handler (handles both sync and async errors)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'production' ? {} : err, // Hide error stack in production for security
  });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.disable("x-powered-by"); // For security: prevent Express version info from being exposed

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

