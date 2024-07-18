"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const user_router_1 = require("../modules/user/user.router");
const academicSemester_router_1 = require("../modules/academicSemester/academicSemester.router");
const academicFaculty_router_1 = require("../modules/academicFaculty/academicFaculty.router");
const academicDepartment_router_1 = require("../modules/academicDepartment/academicDepartment.router");
const faculty_router_1 = require("../modules/Faculty/faculty.router");
const admin_router_1 = require("../modules/Admin/admin.router");
const course_router_1 = require("../modules/courses/course.router");
const semesterRegistration_router_1 = require("../modules/semesterRegistration/semesterRegistration.router");
const OfferedCourse_route_1 = require("../modules/offeredCourse/OfferedCourse.route");
const auth_router_1 = require("../modules/Auth/auth.router");
const enrolledCourse_route_1 = require("../modules/EnrolledCourse/enrolledCourse.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        router: user_router_1.userRouters,
    },
    {
        path: "/students",
        router: student_route_1.StudentRoutes,
    },
    {
        path: "/academic-semesters",
        router: academicSemester_router_1.AcademicSemesterRoutes,
    },
    {
        path: "/academic-faculty",
        router: academicFaculty_router_1.academicFaculty,
    },
    {
        path: "/academic-department",
        router: academicDepartment_router_1.academicDepartment,
    },
    {
        path: "/admin",
        router: admin_router_1.adminRoute,
    },
    {
        path: "/faculty",
        router: faculty_router_1.faculty,
    },
    {
        path: "/course",
        router: course_router_1.course,
    },
    {
        path: "/semesterRegistration",
        router: semesterRegistration_router_1.SemesterRegistration,
    },
    {
        path: "/offeredCourse",
        router: OfferedCourse_route_1.offeredCourseRoutes,
    },
    {
        path: "/auth",
        router: auth_router_1.AuthRoute,
    },
    {
        path: "/enrolled-Course",
        router: enrolledCourse_route_1.EnrolledCourseRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.router));
// router.use('/students',userRouters)
exports.default = router;
