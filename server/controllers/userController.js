
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie-parser");
const user = require("../models/userModel");


const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Corrected: add await
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            name, email, password: hashedPassword
        });

        const saved = await newUser.save();

        const token = jwt.sign(
            { id: saved._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

       res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'None',   // ❗ REQUIRED for cross-site
    secure: true,       // ❗ REQUIRED when sameSite is 'None'
    maxAge: 24 * 60 * 60 * 1000,
});
        res.json({ message: "user created",saved });

    } catch (error) {
        next(error);
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email })
    if (!existingUser) {
        res.status(400).json({ message: "User not exist" })
    }
    const comaparePassword = await bcrypt.compare(password, existingUser.password)
    if (!comaparePassword) {
        return res.status(404).json({
            message: "user login failed"
        })
    }

    const token = jwt.sign(
        { id: existingUser._id }, // ✅ Important: use 'id'
        process.env.SECRET_KEY,
        { expiresIn: "1d" } // Optional but good practice
    );

   res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'None',   // ❗ REQUIRED for cross-site
    secure: true,       // ❗ REQUIRED when sameSite is 'None'
    maxAge: 24 * 60 * 60 * 1000,
});
    res.json({ message: "Login successful", success: true ,existingUser});
}
const logout = async (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'None' }); // match cookie options
    return res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
    createUser, login, logout
}
