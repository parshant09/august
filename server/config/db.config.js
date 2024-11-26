const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use environment variables for sensitive data (e.g., username, password, and DB name)
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/defaultDB";

    // Optional: Log the MongoDB URI without sensitive credentials for debugging
    console.log("Attempting to connect to MongoDB...");

    // Suppress deprecation warnings
    mongoose.set("strictQuery", false);

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }

  // Connection event listeners for monitoring
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to the database.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected.");
  });

  // Graceful shutdown handling
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Mongoose disconnected on app termination.");
    process.exit(0);
  });
};

module.exports = connectDB;

