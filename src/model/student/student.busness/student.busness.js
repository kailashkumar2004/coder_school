const mongoose = require("mongoose");
const express = require("express");
const { Student } = require("../../student/student.model/student.module");
const { secretKey } = require("../../../../config");
const bcrypt = require("bcrypt");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const jwt = require("jsonwebtoken")
const { authenticate} = require("../../../middleware/authmiddleware");

const createStudent = async (body) => {
    const existingUser = await Student.findOne({ email: body.email });
    console.log("existingUser-------------->>", existingUser);
    if (existingUser) {
        throw "email allready create"
    };
    const newStudent = new Student(body);
    console.log("newStudent--------------->>", newStudent);
    if (!newStudent) {
        throw "newStudent data is not find"
    };
    const response = await newStudent.save();

    return {
        msg: "createStudent data is sucessfully",
        result: response
    };
};
const register = async (body) => {
    const existingUser = await Student.findOne({ email: body.email });
    console.log("existingUser--------------->>", existingUser);
    if (existingUser) {
        throw "email allready register"
    };
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashedPassword;

    const saveStudent = new Student(body);
    const response = await saveStudent.save();

    return {
        msg: "register data sucessfully register",
        result: response
    };
};
const login = async (body) => {
    const { emai, password } = body;
    const existingUser = await Student.findOne({ email: body.email }).populate("class","className");
    console.log("existingUser-------------->>", existingUser);
    if (!existingUser) {
        throw "invalited email find"
    };
    const isPasswordMath = await bcrypt.compare(password, existingUser.password);
    console.log("isPasswordMath---------------->>", isPasswordMath);
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
const getStudentByToken = async (body, user) => {
    const getStudent = await Student.findOne({ _id: user._id }).populate("class");
    console.log("getStudent--------------->>", getStudent);
    if (!getStudent) {
        throw "getStudent data is not find"
    };
    return {
        msg: "okk sucessfully data recive",
        result: getStudent
    };
};
const updateStudentByToken = async (body, user) => {
    const updateStudent = await Student.findByIdAndUpdate(user, { $set: body }, { new: true }).populate("class");
    console.log("updateStudent-------------->>", updateStudent);
    if (!updateStudent) {
        throw "updateStudent data is not find"
    };
    return {
        msg: "updateStudent data is sucessfully update",
        result: updateStudent
    };
};
const deleteStudentByToken = async (body, user) => {
    const deleteStudent = await Student.findByIdAndDelete(user).populate("class");
    console.log("deleteStudent------------>>", deleteStudent);
    if (!deleteStudent) {
        throw "deleteStudent data is not find"
    };
    return {
        msg: "deleteStudent data is sucessfully delete",
        result: deleteStudent
    };
};
const resetPassword = async (body, user) => {
    const { email, oldPassword, newPassword, confirmPassword } = body;
    if (!email && !oldPassword && !newPassword && !confirmPassword) {
        throw "all filed required"
    };
    const users = await Student.findOne({ email });
    console.log("users------------->>", users);
    if (!users) {
        throw "users data is not find"
    };
    const isPasswordMath = await bcrypt.compare(oldPassword, users.password);
    console.log("isPasswordMath----------->>", isPasswordMath);
    if (!isPasswordMath) {
        throw "invalited password find"
    };
    if (newPassword !== confirmPassword) {
        throw "miss match password find"
    };
    users.password = await bcrypt.hash(newPassword, 10);
    await users.save();

    return {
        msg: "resetPassword sucessfully",
        result: user
    };
};
const updatePassword = async (body, id, user) => {
    const { newPassword } = body;
    const updatePassword = await Student.findById(id).populate("class");
    console.log("updatePassword---------------->>", updatePassword);
    if (!updatePassword) {
        throw "updatePassword is not find"
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
const searchStudentTokenWithQuery = async (query, user) => {
    const searchStudent = await Student.find(query).populate('class');
    console.log("searchStudent------------->>", searchStudent);
    if (!searchStudent) {
        throw "searchStudent data is not find"
    };
    return {
        msg: "okk sucessfully data recive",
        count: searchStudent.length,
        result: searchStudent
    };
};
const searchStudentWithquery = async (query) => {
    const searchStudent = await Student.find(query).populate("class");
    console.log("searchStudent--------------->>", searchStudent);
    if (!searchStudent) {
        throw "searchStudent data is not find"
    };
    return {
        msg: "okk sucess",
        count: searchStudent.length,
        result: searchStudent
    };
};
const searchStudent = async (body) => {
    const searchStudent = await Student.find(body).populate("class");
    console.log("searchStudent--------------->>", searchStudent);
    if (!searchStudent) throw "searchStudent data is not find";
    return {
        msg: "okk sucess",
        count: searchStudent.length,
        result: searchStudent
    };
};
const allStudent = async (query) => {
    const { page = 1 } = query;
    const limit = 10;
    const skip=(page-1)*limit
    const allStudent = await Student.find().skip(skip).limit(limit).sort({createdAt:-1}).populate("class");
    console.log("allStudent------------->>", allStudent);
    if (!allStudent) {
        throw "allStudent data is not find"
    };
    return {
        msg: "okk sucess",
        count: allStudent.length,
        result: allStudent
    };
};
const getStudentById = async (id) => {
    const getStudent = await Student.findById(id).populate("class");
    console.log("getStudent----------->>", getStudent);
    if (!getStudent) {
        throw "getStudent data is not find"
    };
    return {
        msg: "okk sucess",
        result: getStudent
    };
};
const updateStudentById = async (body, id) => {
    const updateStudent = await Student.findByIdAndUpdate(id, { $set: body }, { new: true }).populate("class");
    console.log("updateStudent-------------->>", updateStudent);
    if (!updateStudent) {
        throw "updateStudent data is not find"
    };
    return {
        msg: "updateStudent data is sucessfully update",
        result: updateStudent
    };
};
const deleteStudentById = async (id) => {
    const deleteStudent = await Student.findByIdAndDelete(id).populate("class");
    console.log("deleteStudent------------>>", deleteStudent);
    if (!deleteStudent) {
        throw "deleteStudent is not find"
    };
    return {
        msg: "deleteStudent data is sucessfully",
        result: deleteStudent
    };
};
const searchWithfirstName = async (body) => {
    const searchStudent = await Student.findOne({ firstName: body.firstName }).populate("class");
    console.log("searchStudent------------>>", searchStudent);
    if (!searchStudent) {
        throw "searchStudent data is not find"
    };
    return {
        msg: "okk sucess",
        result: searchStudent
    };
};
const searchWithName = async (body) => {
    const searchStudent = await Student.find({ firstName: body.firstName }).populate("class");
    console.log("searchStudent------------>>", searchStudent);
    if (!searchStudent) {
        throw "searchStudent data is not find"
    };
    return {
        msg: "okk sucess",
        count: searchStudent.length,
        result: searchStudent
    };
};
module.exports = {
    createStudent, register, login,
    getStudentByToken, updateStudentByToken,
    deleteStudentByToken, resetPassword,
    updatePassword, searchStudentTokenWithQuery,
    searchStudentWithquery, searchStudent,
    allStudent, getStudentById, updateStudentById,
    deleteStudentById, searchWithfirstName,
    searchWithName
}