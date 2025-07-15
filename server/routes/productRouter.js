
const express = require('express');
const { addProduct, getAllProducts, getOneProduct } = require('../controllers/productController');
const { upload } = require('../utils/multer');

const productrouter = express.Router();
productrouter.post('/add', upload.single('image'), addProduct);
productrouter.get("/allproducts",getAllProducts);
productrouter.get("/product/:id",getOneProduct)

module.exports =productrouter;