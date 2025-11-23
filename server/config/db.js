const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Ensure dotenv is configured here as well, in case this module is run separately
dotenv.config();

const connectDB = async () => {
  try {
    // Check if the URI is loaded correctly
    if (!process.env.MONGO_URI) {
      console.error('ERROR: MONGO_URI is not defined in your .env file');
      process.exit(1); // Exit the process with failure
    }
    
    // Attempt to connect
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

