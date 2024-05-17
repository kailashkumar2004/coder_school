const express = require("express");
const router = express.Router();
const { wrapAsync } = require("../../../helpres/router.helpres");
const{authenticate}=require("../../../middleware/authmiddleware")

const { createStudent, register,
    login, getStudentByToken,
    updateStudentByToken,
    deleteStudentByToken,
    resetPassword, updatePassword,
    searchStudentTokenWithQuery,
    searchStudentWithquery, searchStudent,
    allStudent, getStudentById, updateStudentById,
    deleteStudentById,
    searchWithfirstName,
    searchWithName
 } = require("../student.controller/student.conntoler");


router.post("/createStudent", wrapAsync(createStudent));
router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.get("/getStudentByToken", authenticate, wrapAsync(getStudentByToken));
router.put("/updateStudentByToken", authenticate, wrapAsync(updateStudentByToken));
router.delete("/deleteStudentByToken", authenticate, wrapAsync(deleteStudentByToken));
router.put("/resetPassword", authenticate, wrapAsync(resetPassword));
router.put("/updatePassword/:id", authenticate, wrapAsync(updatePassword));
router.get("/searchStudentTokenWithQuery", authenticate, wrapAsync(searchStudentTokenWithQuery));
router.get("/searchStudentWithquery", wrapAsync(searchStudentWithquery));
router.post("/searchStudent", wrapAsync(searchStudent));
router.get("/allStudent", wrapAsync(allStudent));
router.get("/getStudentById/:id", wrapAsync(getStudentById));
router.put("/updateStudentById/:id", wrapAsync(updateStudentById));
router.delete("/deleteStudentById/:id", wrapAsync(deleteStudentById));
router.post("/searchWithfirstName", wrapAsync(searchWithfirstName));
router.post("/searchWithName", wrapAsync(searchWithName));
module.exports = router;
