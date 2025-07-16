const mongoose = require("mongoose");

let isConnected = false;

const connectionDB = async () => {
  if (isConnected) {
    console.log("✅ Using cached MongoDB connection");
    return;
  }

  try {
    if (!process.env.MONGO_URL) {
      throw new Error("❌ MONGO_URL is missing in environment variables");
    }

    const db = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "picksy", // ✅ Explicit DB name (REQUIRED for Atlas with multiple DBs)
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("✅ MongoDB connected successfully");
    } else {
      console.log("❌ MongoDB connection not ready");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error; // ⛔ Important: throw error so route can return 500 if needed
  }
};

module.exports = { connectionDB };
