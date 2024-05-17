const mongoose = require("mongoose");
const express = require("express");
const { Class } = require("../../../../src/model/class/class.model/class.module");
const router = express.Router();
const { School } = require("../../../../src/model/School/school.model/school.model");

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z']



const createClass = async (user, body) => {
    if (user.roleId > 3 && user.roleId < 1) throw msg.actionForbidden;
    let schoolname = await School.findOne({ registeredBy: user._id });
    body.school = schoolname._id;
    let alredyExist = await Class.findOne({ name: body.name, school: schoolname._id });
    if (alredyExist) throw msg.classAlreadyExist;
    let section = [];
    if (body.section) {
        let obj = {}
        obj.name = body.section;
        section.push(obj)
        delete body.section;
        body.section = section;
    }

    let c = new Class(body);
    let result = await c.save();
    return {
        'result': result
    }
}

const addSection = async (user, id) => {
    if (user.roleId > 3 && user.roleId < 1) throw msg.actionForbidden;
    if (!id) throw msg.invalidId;
    let alredyExist = await Class.findOne({ _id: id });
    let sectionList = [...alredyExist.section];
    let obj = {};
    if (sectionList.length == 0) { obj.name = alphabet[0] }
    else {
        obj.name = findIndex(sectionList);
    }
    let classList = await Class.findByIdAndUpdate(id, { $push: { section: obj } }, { new: true });
    if (!classList) throw msg.classNotExist;
    return classList;
}

function findIndex(sectionList) {
    let index = -1
    let length = sectionList.length;
    let lastSection = sectionList[length - 1];

    while (index == -1 && length > 0) {
        index = alphabet.indexOf(lastSection.name);
        length = length - 1
        lastSection = sectionList[length];
    }
    if (sectionList.length > 0 && index >= 0)
        return (alphabet[index + 1].toString());
    else
        return (alphabet[0].toString());
}





const getSectionList = async (user, id) => {
    if (!id) throw msg.idrequired;
    if (user.roleId > 3 && user.roleId < 1) throw msg.actionForbidden;
    let classList = await Class.findById(id);
    if (!classList) throw msg.invalidId;
    return { section: classList.section }
}











// const createClass1 = async (body,user) => {
//     const newClass = new Class(body);
//     console.log("newClass----------->>", newClass);
//     if (!newClass) {
//         throw "newClass data is not find"
//     };
//     const response = await newClass.save();

//     return {
//         msg: "createClass data is sucessfully create",
//         result: response
//     };
// };
// const allClass = async () => {
//     const allclass = await Class.find();
//     console.log("allclass------------>>", allclass);
//     if (!allclass) {
//         throw "allClass data is not find"
//     };
//     return {
//         msg: "okk sucessfully",
//         count: allclass.length,
//         result: allclass
//     };
// };
// const getClassById = async (body, id) => {
//     const getClass = await Class.findById(id);
//     console.log("getClass--------------->>", getClass);
//     if (!getClass) {
//         throw "getClass data is not find"
//     };
//     return {
//         msg: "okk sucess",
//         result: getClass
//     };
// };
// const updateClassById = async (body, id) => {
//     const updateClass = await Class.findByIdAndUpdate(id, { $set: body }, { new: true });
//     console.log("updateClass-------------->>", updateClass);
//     if (!updateClass) {
//         throw "updateClass is not find"
//     };
//     return {
//         msg: "updateClass data is sucessfully",
//         result: updateClass
//     };
// };
// const deleteClassById = async (body, id) => {
//     const deleteClass = await Class.findByIdAndDelete(id);
//     console.log("deleteClass-------------->>", deleteClass);
//     if (!deleteClass) {
//         throw "deleteClass data is not find"
//     };
//     return {
//         msg: "deleteClass data is sucessfully delete",
//         result: deleteClass
//     };
// };
// const searchClassWithQuery = async (query) => {
//     const searchClass = await Class.find(query);
//     console.log("searchClass===============>>", searchClass);
//     if (!searchClass) {
//         throw "searchClass data is not find"
//     };
//     return {
//         msg: "okk sucess",
//         count: searchClass.length,
//         result: searchClass
//     };
// };
// const searchWithClass = async (body) => {
//     const searchClass = await Class.findOne({ className: body.className });
//     console.log("searchClass--------------->>", searchClass);
//     if (!searchClass) {
//         throw "searchClass data is not find"
//     };
//     return {
//         msg: "okk sucess",
//         result: searchClass
//     };
// };
// const searchClass = async (body) => {
//     const searchClassdata = await Class.find({ className: body.className });
//     console.log("searchClassdata------------>>", searchClassdata);
//     if (!searchClassdata) {
//         throw "searchClassdata is not find"
//     };
//     return {
//         msg: "okk sucess",
//         count: searchClassdata.length,
//         result: searchClassdata
//     };
// };
// const searchDta = async (body) => {
//     const searchdata = await Class.find(body);
//     console.log("searchdata-------------->>", searchdata);
//     if (!searchdata) {
//         throw "searchdata is not find"
//     };
//     return {
//         msg: "okk sucess",
//         count: searchdata.length,
//         result: searchdata
//     };
// };
// module.exports = {
//     createClass1, allClass, getClassById, updateClassById,
//     deleteClassById, searchClassWithQuery, searchWithClass,
//     searchClass, searchDta
// }

module.exports={createClass}