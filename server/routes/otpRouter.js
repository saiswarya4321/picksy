
const express=require("express");
const { verifyOtp, sendOtp } = require("../controllers/otpController");
const otprouter=express.Router();

otprouter.post("/verify-otp",verifyOtp)
otprouter.post("/send-otp",sendOtp)
module.exports=otprouter