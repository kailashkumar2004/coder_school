const { createUser, register,
    login, getUserByToken, updateUserByToken,
    deleteUserByToken, resetPassword,
    updatePasswordByUser, searchUserWithTokenQuery,
    searchUserWithQuery, searchUserTokenWithbody,
    searchUser,allUser
 } = require("../user.business/user.busniess");



exports.createUser = async (req) => await createUser(req.body);
exports.register = async (req) => await register(req.body);
exports.login = async (req) => await login(req.body);
exports.getUserByToken = async (req) => await getUserByToken(req.user);
exports.updateUserByToken = async (req) => await updateUserByToken(req.body, req.user);
exports.deleteUserByToken = async (req) => await deleteUserByToken(req.user);
exports.resetPassword = async (req) => await resetPassword(req.body, req.user);
exports.updatePasswordByUser = async (req) => await updatePasswordByUser(req.body, req.user, req.params.id);
exports.searchUserWithTokenQuery = async (req) => await searchUserWithTokenQuery(req.user, req.query);
exports.searchUserWithQuery = async (req) => await searchUserWithQuery(req.query);
exports.searchUserTokenWithbody = async (req) => await searchUserTokenWithbody(req.user, req.body);
exports.searchUser = async (req) => await searchUser(req.body);
exports.allUser = async (req) => await allUser(req.query);