const express = require("express");
const { authUser } = require("../middleware/userAuth");
const { createBuy, cartBuy, createCartOrder, getOrder } = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.post("/order-buy", authUser, createBuy);
orderRouter.post("/order-cart", authUser, createCartOrder)
orderRouter.get("/orders", authUser, getOrder)
module.exports = orderRouter
