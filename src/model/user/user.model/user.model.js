const mongoose = require("mongoose");
const { secretKey } = require("../../../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    roleId: {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
        trim:true
    },
    role: {
        type: String,
        enum: ["admin", "superAdmin", "teacher"],
        trim:true
    },
    phoneNu: {
        type:Number
    },
    date: {
        type:Date
    }
}, {
    timestamps: true,
    versionKey: false
});
userSchema.statics.findByToken = async function (token) {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        console.log("decodedToken------------->>", decodedToken);
        if (decodedToken) throw "token is not find";
        const user = await this.findByToken(decodedToken.id);
        console.log("user------------->>", user);
        if (!user) throw "user data is not find";
        return user();
    } catch (error) {
        console.log("error--------------->>", error);
        throw "error message"
    };
};
userSchema.methods.comparePassword = async function (interedPassword) {
    return bcrypt.compare(interedPassword, this.password)
};
const User = mongoose.model("User", userSchema);
module.exports={User}