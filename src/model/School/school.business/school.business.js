const mongoose = require("mongoose");
const express = require("express");
const { School } = require("../../../../src/model/School/school.model/school.model");



const createSchool = async (body) => {
    const newSchool = new School(body);
    console.log("newSchool------------>>", newSchool);
    if (!newSchool) {
        throw "newSchool data is not find"
    };
    const response = await newSchool.save();

    return {
        msg: "create School sucess",
        result: response
    };
};
const allSchool = async () => {
    const alldata = await School.find().populate("user","firstName lastName date");
    console.log("alldata---------------->>", alldata);
    if (!alldata) {
        throw "data is not find"
    };
    return {
        msg: "okkk sucess",
        count: alldata.length,
        result: alldata
    };
};
const getSchoolById = async (id) => {
    const getSchool = await School.findById(id).populate("user");
    console.log("getSchool------------>><<", getSchool);
    if (!getSchool) {
        throw "getSchool data is not find"
    };
    return {
        msg: "okk sucess",
        result: getSchool
    };
};
const updateSchoolById = async (body, id) => {
    const updateSchool = await School.findByIdAndUpdate(id, { $set: body }, { new: true }).populate("user");
    console.log("updateSchool------------->>", updateSchool);
    if (!updateSchool) {
        throw "updateSchool data is not find"
    };
    return {
        msg: "updateSchool is sucessfully update",
        result: updateSchool
    };
};
const deleteSchoolById = async (id) => {
    const deleteSchool = await School.findByIdAndDelete(id).populate("user");
    console.log("deleteSchool----------->>", deleteSchool);
    if (!deleteSchool) {
        throw "deleteSchool data is not find"
    }
    return {
        msg: "deleteSchool data is sucessfully delete",
        result: deleteSchool
    };
};
module.exports = {
    createSchool,
    allSchool, getSchoolById,
    updateSchoolById,deleteSchoolById
}