const OtpModel = require("../models/OtpModel");
const nodemailer = require('nodemailer');

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Convert entered OTP to Number for proper comparison
        const otpData = await OtpModel.findOne({ email, otp: Number(otp) });

        if (!otpData) {
            return res.json({ success: false, message: 'OTP wrong' });
        }

        const currentTime = new Date();
        const otpTime = new Date(otpData.createdAt);
        const diff = (currentTime - otpTime) / 1000; // seconds

        if (diff > 120) { // 2 minutes expiry
            return res.json({ success: false, message: 'OTP expired' });
        }

        await OtpModel.deleteOne({ email, otp: Number(otp) }); // OTP Used Once
        res.json({ success: true, message: 'OTP Verified' });

    } catch (error) {
        console.error('Error in verifyOtp:', error.message);
        res.status(500).json({ message: 'Server error while verifying OTP', success: false });
    }
}

const sendOtp = async (req, res) => {
    try {
        function generateOTP() {
            return Math.floor(100000 + Math.random() * 900000);
        }

        const { email } = req.body;
        const otp = generateOTP();

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // Save OTP to DB
        await OtpModel.create({ email, otp, createdAt: new Date() });

        // Send OTP via Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}`
        });

        res.json({ message: 'OTP send', success: true });

    } catch (error) {
        console.error('Error in sendOtp:', error.message);
        res.status(500).json({ message: 'Server error while sending OTP', success: false });
    }
}

module.exports = {
    verifyOtp,sendOtp
}