const { createStudent, register, login,
    getStudentByToken, updateStudentByToken,
    deleteStudentByToken, resetPassword,
    updatePassword, searchStudentTokenWithQuery,
    searchStudentWithquery, searchStudent,
    allStudent, getStudentById, updateStudentById,
    deleteStudentById, searchWithfirstName,
    searchWithName
}= require("../student.busness/student.busness");


exports.createStudent = async (req) => await createStudent(req.body);
exports.register = async (req) => await register(req.body);
exports.login = async (req) => await login(req.body);
exports.getStudentByToken = async (req) => await getStudentByToken(req.body, req.user);
exports.updateStudentByToken = async (req) => await updateStudentByToken(req.body, req.user);
exports.deleteStudentByToken = async (req) => await deleteStudentByToken(req.body, req.user);
exports.resetPassword = async (req) => await resetPassword(req.body, req.user);
exports.updatePassword = async (req) => await updatePassword(req.body, req.params.id, req.user);
exports.searchStudentTokenWithQuery = async (req) => await searchStudentTokenWithQuery(req.query, req.user);
exports.searchStudentWithquery = async (req) => await searchStudentWithquery(req.query);
exports.searchStudent = async (req) => await searchStudent(req.body);
exports.allStudent = async (req) => await allStudent(req.query);
exports.getStudentById = async (req) => await getStudentById(req.params.id);
exports.updateStudentById = async (req) => await updateStudentById(req.body, req.params.id);
exports.deleteStudentById = async (req) => await deleteStudentById(req.params.id);
exports.searchWithfirstName = async (req) => await searchWithfirstName(req.body);
exports.searchWithName = async (req) => await searchWithName(req.body);