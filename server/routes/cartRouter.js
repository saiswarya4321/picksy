
const express= require('express');
const { addCart, getCart, deleteCart } = require('../controllers/cartController');
const { authUser } = require('../middleware/userAuth');
const cartRouter=express.Router();

cartRouter.post("/add",authUser,addCart)
cartRouter.get("/getcart",authUser,getCart)
cartRouter.delete("/delete/:id",authUser,deleteCart)
module.exports=cartRouter;