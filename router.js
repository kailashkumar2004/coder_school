const Student = require("./src/model/student/student.router/student.router");
const ClassRouter = require("./src/model/class/class.router/class.router");
const User = require("./src/model/user/user.router/user.router");
const School = require("./src/model/School/school.router/school.router");
// const Teacher = require("./src/model/teacher/teacher.router/teacher.router");

module.exports = [
    {
        path: "/api/Student",
        handler:Student
    },
    {
        path: "/api/ClassRouter",
        handler:ClassRouter
    },
    {
        path: "/api/User",
        handler:User
    },
    {
        path: "/api/School",
        handler:School
    },
    // {
    //     path: "/api/Teacher",
    //     handler:Teacher
    // }
]