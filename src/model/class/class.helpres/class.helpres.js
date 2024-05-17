// const { createClass1, allClass,
//     getClassById, updateClassById, deleteClassById,
//     searchClassWithQuery, searchWithClass, searchClass,
//     searchDta
//  } = require("../class.busness/class.busness");


// exports.createClass1 = async (req) => await createClass1(req.body,req.user);
// exports.allClass = async (req) => await allClass();
// exports.getClassById = async (req) => await getClassById(req.body, req.params.id);
// exports.updateClassById = async (req) => await updateClassById(req.body, req.params.id);
// exports.deleteClassById = async (req) => await deleteClassById(req.body, req.params.id);
// exports.searchClassWithQuery = async (req) => await searchClassWithQuery(req.query);
// exports.searchWithClass = async (req) => await searchWithClass(req.body);
// exports.searchClass = async (req) => await searchClass(req.body);
// exports.searchDta = async (req) => await searchDta(req.body);

const { createClass } = require("../class.busness/class.busness");



exports.createClass = async (req) => await createClass(req.user, req.body);