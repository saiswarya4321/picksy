const express = require("express");
const { connectionDB } = require("../config/db.js");
require("dotenv").config();

const userRouter = require("../routes/userRouter.js");
const otprouter = require("../routes/otpRouter.js");
const productrouter = require("../routes/productRouter.js");
const cartRouter = require("../routes/cartRouter.js");
const paymentrouter = require("../routes/payment.js");
const orderRouter = require("../routes/orderRouter.js");
const paymentnewrouter = require("../routes/paymentnew.js");

const cookie = require("cookie-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

// Middleware
app.use(express.json());
app.use(cookie());

app.use(
  cors({
    origin: [
      "https://picksy-frontend.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/user", userRouter);
app.use("/otp", otprouter);
app.use("/products", productrouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentrouter);
app.use("/order", orderRouter);
app.use("/paymentone", paymentnewrouter);

app.get("/", (req, res) => {
  res.send("Welcome to Picksy");
});

// ✅ Ensure MongoDB connects on cold start
connectionDB(); // 🔁 No await here — just call once globally

// ✅ Export immediately
module.exports = app;
module.exports.handler = serverless(app);
