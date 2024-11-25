/**
 *
 * @author Anass Ferrak aka " TheLordA " <ferrak.anass@gmail.com>
 * GitHub repo: https://github.com/TheLordA/Instagram-Clone
 *
 */

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

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via process.env.VARIABLE_NAME syntax
require("dotenv").config();

// Connection to DB
connectDB();

// Create the Express application object
const app = express();

// Compress the HTTP response sent back to a client
app.use(compression()); // Compress all routes

// Use Helmet to protect against well-known vulnerabilities
app.use(helmet());

// Use Morgan in dev mode for logging
app.use(morgan("dev"));

// Set up CORS to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the React app we're connecting to
    credentials: true,
  })
);

// Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- ROUTES ----------------
 */
// Root route to check if server is running
app.get("/", (req, res) => {
  res.send("Backend server is up and running!");
});

// Include the food route
app.use("/api/food", foodRoute); // <-- This will handle /api/food requests

// Other routes
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/posts", postRoute); // Post routes
app.use("/api/users", userRoute); // User routes

/**
 * -------------- SERVER ----------------
 */

// Specify the PORT on which the server will run (5000)
const PORT = process.env.PORT || 5000;

// Disabling the "X-Powered-By" tag for security
app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode, under port ${PORT}.`);
});

