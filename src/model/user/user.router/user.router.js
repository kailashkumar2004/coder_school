const express = require("express");
const router = express.Router();
const { wrapAsync } = require("../../../helpres/router.helpres");
const { userAuthenticate } = require("../../../middleware/usermiddleware");

const { createUser, register,
    login, getUserByToken, updateUserByToken,
    deleteUserByToken, resetPassword,
    updatePasswordByUser, searchUserWithTokenQuery,
    searchUserWithQuery, searchUserTokenWithbody,
    searchUser,allUser
 } = require("../user.controller/user.controller");



router.post("/createUser", wrapAsync(createUser));
router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.get("/getUserByToken", userAuthenticate, wrapAsync(getUserByToken));
router.put("/updateUserByToken", userAuthenticate, wrapAsync(updateUserByToken));
router.delete("/deleteUserByToken", userAuthenticate, wrapAsync(deleteUserByToken));
router.put("/resetPassword", userAuthenticate, wrapAsync(resetPassword));
router.put("/updatePasswordByUser/:id", userAuthenticate, wrapAsync(updatePasswordByUser));
router.get("/searchUserWithTokenQuery", userAuthenticate, wrapAsync(searchUserWithTokenQuery));
router.get("/searchUserWithQuery", wrapAsync(searchUserWithQuery));
router.post("/searchUserTokenWithbody", userAuthenticate, wrapAsync(searchUserTokenWithbody));
router.post("/searchUser", wrapAsync(searchUser));
router.get("/allUser", wrapAsync(allUser));


module.exports = router;