
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
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not exist" });
    }

    const comparePassword = await bcrypt.compare(password, existingUser.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Login successful", success: true, existingUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'None', // Required for cross-site cookies
      secure: true,     // Required when sameSite is 'None'
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};


module.exports = {
    createUser, login, logout
}
