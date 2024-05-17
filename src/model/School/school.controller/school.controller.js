const { createSchool, allSchool,
    getSchoolById, updateSchoolById,
    deleteSchoolById
 } = require("../school.business/school.business");


exports.createSchool = async (req) => await createSchool(req.body);
exports.allSchool = async (req) => await allSchool();
exports.getSchoolById = async (req) => await getSchoolById(req.params.id);
exports.updateSchoolById = async (req) => await updateSchoolById(req.body, req.params.id);
exports.deleteSchoolById = async (req) => await deleteSchoolById(req.params.id);