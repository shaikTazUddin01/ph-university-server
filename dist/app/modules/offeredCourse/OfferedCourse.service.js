"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../../errors/AppErrors");
const semesterRegistration_model_1 = __importDefault(require("../semesterRegistration/semesterRegistration.model"));
const OfferedCourse_model_1 = require("./OfferedCourse.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const acdemicFaculty_model_1 = require("../academicFaculty/acdemicFaculty.model");
const faculty_model_1 = __importDefault(require("../Faculty/faculty.model"));
const course_model_1 = require("../courses/course.model");
const offerrdCourse_utiles_1 = require("./offerrdCourse.utiles");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, course, academicDepartment, academicFaculty, semesterRegistration, section, days, startTime, endTime, } = payload;
    //check if the semester registration id is exists
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.default.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "semester registration not found");
    }
    const academicSemester = isSemesterRegistrationExists === null || isSemesterRegistrationExists === void 0 ? void 0 : isSemesterRegistrationExists.academicSemester;
    //check if the academicSemester id is exists
    const isAcademicSemesterExists = yield academicSemester_model_1.AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "academic semester not found");
    }
    //check if the academicDepartment id is exists
    const isacademicDepartmentExists = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isacademicDepartmentExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "Academic Department not found");
    }
    //check if the academic Faculty id is exists
    const isAcademicFacultyExists = yield acdemicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "Academic Faculty not found");
    }
    //check if the faculty id is exists
    const isfacultyExists = yield faculty_model_1.default.findById(faculty);
    if (!isfacultyExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "Faculty is not found");
    }
    //check if the course id is exists
    const iscourse = yield course_model_1.Courses.findById(course);
    if (!iscourse) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "course is not found");
    }
    //check if ther department is belong to the faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, `this ${isacademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`);
    }
    //check if the same course same section in same registered semester exists
    const isSameCourseSameSectionInSameRegisteredSemesterExists = yield OfferedCourse_model_1.OfferedCourse.findOne({
        academicSemester,
        course,
        section,
    });
    if (isSameCourseSameSectionInSameRegisteredSemesterExists) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, `The same course same section in same registered semester do not entry`);
    }
    // get the schedules of the faculties
    const assignedSchedules = yield OfferedCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    console.log(assignedSchedules);
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    if ((0, offerrdCourse_utiles_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppErrors_1.AppError(http_status_1.default.CONFLICT, `This faculty is not abaliable at this time`);
    }
    //create offeredCourse
    const result = yield OfferedCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, days, startTime, endTime } = payload;
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, `offered course not found !`);
    }
    const isFacultyExists = yield faculty_model_1.default.findById(faculty);
    if (!isFacultyExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, `Faculty not found !`);
    }
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semesterRegistration_model_1.default.findById(semesterRegistration);
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== "UPCOMING") {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, `you can not update this offerd course`);
    }
    // get the schedules of the faculties
    const assignedSchedules = yield OfferedCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    console.log(assignedSchedules);
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    if ((0, offerrdCourse_utiles_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppErrors_1.AppError(http_status_1.default.CONFLICT, `This faculty is not abaliable at this time`);
    }
    const result = yield OfferedCourse_model_1.OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
//get add offered course
const getOfferedCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield OfferedCourse_model_1.OfferedCourse.find()
        .populate("semesterRegistration")
        .populate("academicSemester")
        .populate("academicFaculty")
        .populate("academicDepartment")
        .populate("course")
        .populate("faculty");
    return result;
});
const getOfferedSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield OfferedCourse_model_1.OfferedCourse.findById(id);
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB,
    updateOfferedCourseIntoDB,
    getOfferedCourseFromDB,
    getOfferedSingleCourseFromDB,
};
