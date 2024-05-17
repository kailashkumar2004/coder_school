const mongoose = require("mongoose");
const { secretKey } = require("../../../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim:true
    },
    lastName: {
        type: String,
        trim:true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim:true

    },
    date: {
        type: Date
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    phoneNu: {
        type: Number,
        trim:true

    }
}, {
    timestamps: true,
    versionKey: false
});
studentSchema.statics.findByToken = async function (token) {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        if (!decodedToken) throw "token is not find";
        const user = await this.findByToken(decodedToken.id);
        console.log("user--------------->>", user);
        if (!user) throw "user is not find";
        return user();
    } catch (error) {
        console.log("error---------------->>", error);
        throw "error message"
    };
};
studentSchema.methods.comparePassword = async function (interedPassword) {
    return bcrypt.compare(interedPassword, this.password)
};
const Student = mongoose.model("Student", studentSchema);
module.exports = { Student };