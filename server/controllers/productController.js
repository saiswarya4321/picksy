const ProductModel = require('../models/ProductModel');

require('dotenv').config();


const addProduct = async (req, res, next) => {
    try {
        const { name, category, price, description,brand } = req.body;
        const image = req.file ? req.file.path : '';

        const newProduct = new ProductModel({
            name,
            category,
            price,
            description,
            brand,
            image
        });

        const savedProduct = await newProduct.save();
        res.json({ message: "Product added successfully", Product: savedProduct });
    } catch (error) {
       console.error('Error adding product:', JSON.stringify(error, null, 2)); // Pretty print full object
    res.status(500).json({ message: 'Error adding product', error: error.message || error });
    }
};
const getAllProducts=async (req,res)=>{
try {
    const products=await ProductModel.find();
    res.json({message:"success",products});
    
} catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
}
}
const getOneProduct= async (req,res)=>{
    try {
      const {id}=req.params ;
      const product= await ProductModel.findById(id);
      res.json({message:"product",product})
    } catch (error) {
          res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

module.exports = { addProduct ,getAllProducts,getOneProduct};