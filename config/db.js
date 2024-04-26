const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const mongoURI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
