const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "User not authenticated (no token)" });
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = { id: verifiedToken.id }; 
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = { authUser };
