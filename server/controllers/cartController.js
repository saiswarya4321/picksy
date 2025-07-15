const CartModel = require("../models/CartModel");

const addCart = async (req, res) => {

    const { productId, quantity } = req.body;
    const userId = req.user.id;
    
   
    try {
        const cartItem = await CartModel.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await CartModel.create({ user: userId, product: productId, quantity });
        }

        res.status(200).json({ message: 'Added to cart' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }

}

const getCart = async (req, res) => {
    try {
        const cartItems = await CartModel.find({ user: req.user.id }).populate('product');
        res.status(200).json({ cartItems });
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: 'Failed to get cart items' });
    }
}

const deleteCart = async (req, res) => {
    try {
        const result = await CartModel.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!result) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        console.error("Error removing item:", err);
        res.status(500).json({ message: 'Failed to remove item' });
    }
}


module.exports = { addCart, getCart, deleteCart }