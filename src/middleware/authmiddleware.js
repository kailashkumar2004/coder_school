const mongoose = require("mongoose");
const { Student } = require("../../src/model/student/student.model/student.module");
const { secretKey } = require("../../config");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw new Error("Authorization header is missing or invalid");
        }
        const token = authHeader.substring("Bearer ".length);
        console.log("token------------------->>", token);
        const decode = jwt.verify(token, secretKey);
        console.log("decode-------------->>", decode);
        const userData = await Student.findOne({ _id: decode.id });
        console.log("userData------------>>", userData);
        if (!userData) {
            throw new Error("User data not found");
        }
        req.user = userData;
        next();
    } catch (error) {
        console.error("error------------------>>", error);
        throw new Error("Authentication failed");
    }
};

const errorHandle = (status) => {
    return {
        status: status || 500,
        msg: "Internal server error"
    };
};

module.exports = {
    errorHandle,
    authenticate
};
