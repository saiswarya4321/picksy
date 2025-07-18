
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    brand:String,
    image: String
});

module.exports = mongoose.model('Product', productSchema);