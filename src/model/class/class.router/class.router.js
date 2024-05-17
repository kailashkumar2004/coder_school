const express = require("express");
const router = express.Router();
const { wrapAsync } = require("../../../helpres/router.helpres");
const{userAuthenticate}=require("../../../middleware/usermiddleware")


// const { createClass1, allClass, getClassById, updateClassById,
//     deleteClassById, searchClassWithQuery, searchWithClass,
//     searchClass,searchDta
// } = require("../class.helpres/class.helpres");



// router.post("/createClass1",userAuthenticate, wrapAsync(createClass1));
// router.get("/allClass", wrapAsync(allClass));
// router.get("/getClassById/:id", wrapAsync(getClassById));
// router.put("/updateClassById/:id", wrapAsync(updateClassById));
// router.delete("/deleteClassById/:id", wrapAsync(deleteClassById));
// router.get("/searchClassWithQuery", wrapAsync(searchClassWithQuery));
// router.post("/searchWithClass", wrapAsync(searchWithClass));
// router.post("/searchClass", wrapAsync(searchClass));
// router.post("/searchDta", wrapAsync(searchDta));

// module.exports = router;


const { createClass } = require("../class.helpres/class.helpres");


router.post("/createClass", userAuthenticate, wrapAsync(createClass));



module.exports=router