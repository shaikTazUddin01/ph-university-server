"use strict";
//year semestercode 4 digit number
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastAdminId = exports.lastFacultyId = exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
//for student
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: "student",
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    // "2026 03 0002"
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
    // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //first time 0000
    let currentId = (0).toString();
    // "2026 03 0002"
    const lastStudentId = yield findLastStudentId();
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const currrentSemesterCode = payload.code;
    const currentYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currrentSemesterCode &&
        lastStudentYear === currentYear) {
        // "2026 03 0002"
        currentId = lastStudentId.substring(6);
    }
    // const currentId = (await findLastStudentId()) || (0).toString();
    //   console.log(await );
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    // console.log(incrementId);
    return incrementId;
});
exports.generateStudentId = generateStudentId;
// find id for faculty and admin
const findId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyuserId = yield user_model_1.User.findOne({
        role: role,
    }, {
        id: 1,
        _id: 0,
    })
        .sort({ createdAt: -1 })
        .lean();
    return (lastFacultyuserId === null || lastFacultyuserId === void 0 ? void 0 : lastFacultyuserId.id) || undefined;
    // return lastFacultyuserId?.id ? lastFacultyuserId?.id : undefined;
});
const lastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const facultyId = yield findId("faculty");
    let currentId = (0).toString();
    if (facultyId) {
        currentId = facultyId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.lastFacultyId = lastFacultyId;
//admin
const lastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const AdminId = yield findId("admin");
    let currentId = (0).toString();
    if (AdminId) {
        currentId = AdminId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.lastAdminId = lastAdminId;
