const CartModel = require("../models/CartModel");
const orderModel = require("../models/orderModel");

const createBuy = async (req, res) => {
  try {
    const item = req.body.item;


    const newOrder = new orderModel({
      user: req.user.id,
      items: [
        {
          product: item.product._id,
          quantity: item.quantity
        }
      ],
     totalAmount: (item.product.price + 4) * item.quantity

    });

    await newOrder.save();

    // ✅ Remove from cart
    if (item._id) {
      const deleted = await CartModel.findOneAndDelete({
        _id: item._id,
        user: req.user.id,
      });

      if (!deleted) {
        console.warn("Cart item not found for deletion:", item._id);
      }
    }

    res.status(201).json({ message: "Order placed and item removed from cart" });
  } catch (err) {
    console.error("Order Error:", err); // <- check your terminal log here
    res.status(500).json({ message: "Server error" });
  }
};

const createCartOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId",userId)

    // 1. Get all cart items for user
    const cartItems = await CartModel.find({ user: userId }).populate('product');

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Create order
    const order = new orderModel({
  user: userId,
  items: cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity
  })),
  totalAmount: cartItems.reduce((total, item) =>
    total + (item.product.price + 4) * item.quantity, 0)
});

    await order.save();

    // 3. Clear cart
    await CartModel.deleteMany({ user: userId });

    res.status(201).json({ message: "Cart order placed & cart cleared" });
  } catch (err) {
    console.error("Cart Order Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const getOrder = async (req, res) => {

  try {
    const userid = req.user.id;

    const orders = await orderModel.find({ user: userid }).populate('items.product')
    res.status(201).json({ orders })
  } catch (error) {
    res.status(500).json({ message: "Error in fetching orders" }, error.message)
  }
}

module.exports = { createBuy, createCartOrder, getOrder };
