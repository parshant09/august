const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Prepare for MongoDB connection with the URI from environment variables
    const mongoURI = process.env.MONGO_URI;

    // Set mongoose options (no need for deprecated ones)
    mongoose.set('strictQuery', false); // To suppress strictQuery warning

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

