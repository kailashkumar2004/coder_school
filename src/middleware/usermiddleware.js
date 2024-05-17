const mongoose = require("mongoose");
const { User } = require("../../src/model/user/user.model/user.model");
const { secretKey } = require("../../config");
const jwt = require("jsonwebtoken");

const userAuthenticate = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization"); // Corrected header name
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Authorization header missing or incorrect" }); // Improved error message and status
        }

        const token = authHeader.substring(7); // Corrected method name
        console.log("token---------------->>", token);

        const decoded = jwt.verify(token, secretKey);
        console.log("decoded------------->>", decoded);

        const userData = await User.findOne({ _id: decoded.id });
        console.log("userData-------------->>", userData);
        if (!userData) {
            return res.status(404).json({ msg: "User not found" }); // Improved error message and status
        }

        req.user = userData;
        next();
    } catch (error) {
        console.log("error-------------->>", error);
        return res.status(500).json({ msg: "Internal server error" }); // Improved error message and status
    }
};

function errorHandle(error, status) {
    return {
        error: status || 500,
        msg: error.message || "Internal server error"
    };
}

module.exports = {
    errorHandle,
    userAuthenticate
};
