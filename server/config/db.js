const mongoose = require("mongoose");
// require("dotenv").config()
let isConnected = false; // ✅ Reuse existing connection on Vercel serverless

const connectionDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    if (!process.env.MONGO_URL) {
      throw new Error("❌ MONGO_URL not set in environment variables");
    }

    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      // ⛔ No need for useUnifiedTopology in Mongoose 7+
      serverSelectionTimeoutMS: 10000, // Optional: set timeout explicitly
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("✅ MongoDB connected successfully");
    } else {
      console.log("❌ MongoDB connection failed");
    }

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

module.exports = { connectionDB };
