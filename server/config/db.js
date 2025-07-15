const { default: mongoose } = require("mongoose");
// require("dotenv").config();

let isConnected = false; // 🔁 Reuse connection on Vercel serverless

const connectionDB = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("Database connected successfully");
    } else {
      console.log("Database connection failed");
    }
  } catch (error) {
    console.error(" Error connecting to database:", error);
  }
};

module.exports = { connectionDB };
