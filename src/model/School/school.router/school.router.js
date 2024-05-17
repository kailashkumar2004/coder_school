const express = require("express");
const router = express.Router();
const { wrapAsync } = require("../../../helpres/router.helpres");



const { createSchool, allSchool,
    getSchoolById, updateSchoolById,
    deleteSchoolById
 } = require("../school.controller/school.controller");


router.post("/createSchool", wrapAsync(createSchool));
router.get("/allSchool", wrapAsync(allSchool));
router.get("/getSchoolById/:id", wrapAsync(getSchoolById));
router.put("/updateSchoolById/:id", wrapAsync(updateSchoolById));
router.delete("/deleteSchoolById/:id", wrapAsync(deleteSchoolById));
module.exports = router;