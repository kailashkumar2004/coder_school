const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../../../../src/model/user/user.model/user.model");
const { secretKey } = require("../../../../config");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const{userAuthenticate}=require("../../../middleware/usermiddleware")


const createUser = async (body) => {
    const existingUser = await User.findOne({ email: body.email });
    console.log("existingUser============>>", existingUser);
    if (existingUser) {
        throw "email allready create"
    };
    const newUser = new User(body);
    console.log("newUser------------>>", newUser);
    if (!newUser) {
        throw "newUser data is not find"
    };
    const response = await newUser.save();

    return {
        msg: "okk sucessfully create User",
        result: response
    };
};
const register = async (body) => {
    const existingUser = await User.findOne({ email: body.email });
    console.log("existingUser---------------->>", existingUser);
    if (existingUser) {
        throw "email allready register"
    };
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashedPassword;

    const saveUser = new User(body);
    const response = await saveUser.save();

    return {
        msg: 'register data sucessfully',
        result: response
    };
};
const login = async (body) => {
    const { email, password } = body
    const existingUser = await User.findOne({ email: body.email });
    console.log("existingUser------------->>", existingUser);
    if (!existingUser) {
        throw "invalited email find"
    };
    const isPasswordMath = await bcrypt.compare(password, existingUser.password);
    console.log("isPasswordMath------------>>", isPasswordMath);
    if (!isPasswordMath) {
        throw "invalited password find"
    };
    const token = jwt.sign({ id: existingUser._id.toString() }, secretKey);

    return {
        msg: "login sucess",
        user: existingUser,
        token
    };
};
const getUserByToken = async (user) => {
    const getUser = await User.findOne({ _id: user.id });
    console.log("getUser============>><<", getUser);
    if (!getUser) {
        throw "getUser data is not find"
    };
    return {
        msg: "okk sucess",
        result: getUser
    };
};
const updateUserByToken = async (body, user) => {
    const updateUser = await User.findByIdAndUpdate(user, { $set: body }, { new: true });
    console.log("updateUser-------------->>", updateUser);
    if (!updateUser) {
        throw "updateUser data is not find"
    };
    return {
        msg: "updateUser data is sucessfully update",
        result: updateUser
    };
};
const deleteUserByToken = async (user) => {
    const deleteUser = await User.findByIdAndDelete(user);
    console.log("deleteUser------------->>", deleteUser);
    if (!deleteUser) {
        throw "deleteUser data is not find"
    };
    return {
        msg: "deleteUser data is sucessfully delete",
        result: deleteUser
    };
};
const resetPassword = async (body, user) => {
    const { email, oldPassword, newPassword, confirmPassword } = body;
    if (!email && !oldPassword && !newPassword && !confirmPassword) {
        throw "all filed is required"
    };
    const users = await User.findOne({ email });
    console.log("users---------------->>", users);
    if (!users) {
        throw "users data is not find"
    };
    const isPasswordMath = await bcrypt.compare(oldPassword, users.password);
    console.log("isPasswordMath------------------->>", isPasswordMath);
    if (!isPasswordMath) {
        throw "invalited password find"
    };
    if (newPassword !== confirmPassword) {
        throw "miss match password find"
    };
    users.password = await bcrypt.hash(newPassword, 10);
    await users.save();

    return {
        msg: "restePassword sucess",
        result: users
    };
};
const updatePasswordByUser = async (body, user, id) => {
    const { newPassword } = body;
    const updatePassword = await User.findById(id);
    console.log("updatePassword----------->>", updatePassword);
    if (!updatePassword) {
        throw "update data is not find"
    };
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.newPassword, saltRounds);
    updatePassword.password = hashedPassword;

    await updatePassword.save();

    return {
        msg: "updatePassword sucessfully update",
        result: updatePassword
    };
};
const searchUserWithTokenQuery = async (user, query) => {
    const searchUser = await User.find(query);
    console.log("searchUser------------->>", searchUser);
    if (!searchUser) {
        throw "data is not find"
    };
    return {
        msg: "okk sucess user",
        count: searchUser.length,
        result: searchUser
    };
};
const searchUserWithQuery = async (query) => {
    const searchUser = await User.find(query);
    console.log("searchUser-------------->>", searchUser);
    if (!searchUser) {
        throw "user is not find"
    };
    return {
        msg: "okk sucess",
        count: searchUser.length,
        result: searchUser
    };
};
const searchUserTokenWithbody = async (user, body) => {
    const searchUser = await User.find(body);
    console.log("searchUser----------->>", searchUser);
    if (!searchUser) {
        throw "data is not find"
    };
    return {
        msg: "okk sucess",
        count: searchUser.length,
        result: searchUser
    };
};
const searchUser = async (body) => {
    const searchdata = await User.find(body);
    console.log("searchdata-------------->>", searchdata);
    if (!searchdata) {
        throw "searchdata is not find"
    };
    return {
        msg: "okk sucess",
        count: searchdata.length,
        result: searchdata
    };
};
const allUser = async (query) => {
    const { page = 1 } = query;
    const limit = 10;
    const skip=(page-1)*limit
    const alldata = await User.find().skip(skip).limit(limit).sort({createdAt:-1});
    console.log("alldata------------>>", alldata);
    if (!alldata) {
        throw "alldata is not find"
    }
    return {
        msg: "okk sucess",
        count: alldata.length,
        result: alldata
    };
};
module.exports = {
    createUser, register, login,
    getUserByToken, updateUserByToken,
    deleteUserByToken, resetPassword,
    updatePasswordByUser,
    searchUserWithTokenQuery,
    searchUserWithQuery, searchUserTokenWithbody,
    searchUser,allUser
}