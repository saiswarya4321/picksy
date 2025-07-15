const express= require("express");
const { createUser, login, logout, checkAuth } = require("../controllers/userController");
const router=express.Router();


router.post("/create",createUser)
router.post("/login",login)
router.post("/logout",logout)






module.exports = router; 