const express = require("express");
const { connectionDB } = require("../config/db.js"); // ⬅️ changed
const userRouter = require("../routes/userRouter.js"); // ⬅️ changed
require("dotenv").config();
const cookie = require("cookie-parser");
const otprouter = require("../routes/otpRouter.js"); // ⬅️ changed
const cors = require("cors");
const productrouter = require("../routes/productRouter.js"); // ⬅️ changed
const cartRouter = require("../routes/cartRouter.js"); // ⬅️ changed
const paymentrouter = require("../routes/payment.js"); // ⬅️ changed
const orderRouter = require("../routes/orderRouter.js"); // ⬅️ changed
const paymentnewrouter = require("../routes/paymentnew.js"); // ⬅️ changed
const serverless = require("serverless-http");

const app = express();
connectionDB();

app.use(express.json());
app.use(cookie());

app.use(
  cors({
    origin: [
      "https://picksy-frontend.vercel.app", // ✅ Production frontend
      "http://localhost:5173"               // ✅ Local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use("/user", userRouter);
app.use("/otp", otprouter);
app.use("/products", productrouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentrouter);
app.use("/order", orderRouter);
app.use("/paymentone", paymentnewrouter);

app.get("/", (req, res) => {
  res.send("Welcome to picksy");
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
}

// ✅ For Vercel
module.exports = app;
module.exports.handler = serverless(app);
