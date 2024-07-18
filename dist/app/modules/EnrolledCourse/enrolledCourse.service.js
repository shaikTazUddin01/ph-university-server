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
exports.EnrolledCourseServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../../errors/AppErrors");
const OfferedCourse_model_1 = require("../offeredCourse/OfferedCourse.model");
const enrolledCourse_model_1 = __importDefault(require("./enrolledCourse.model"));
const student_model_1 = __importDefault(require("../student/student.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const semesterRegistration_model_1 = __importDefault(require("../semesterRegistration/semesterRegistration.model"));
const course_model_1 = require("../courses/course.model");
const faculty_model_1 = __importDefault(require("../Faculty/faculty.model"));
const enrolledCourse_utils_1 = require("./enrolledCourse.utils");
const createEnrolledCourseIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    /**
     * Step1: Check if the offered cousres is exists
     * Step2: Check if the student is already enrolled
     * Step3: Check if the max credits exceed
     * Step4: Create an enrolled course
     */
    const { offeredCourse } = payload;
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "offered course is not found");
    }
    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Room is full");
    }
    const student = yield student_model_1.default.findOne({ id: userId }).select("_id");
    if (!student) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "student is not found");
    }
    const isStudentAlreadyEnroll = yield enrolledCourse_model_1.default.findOne({
        semesterRegistration: isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.semesterRegistration,
        offeredCourse,
        student: student._id,
    });
    if (isStudentAlreadyEnroll) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This course is already enrolled");
    }
    //check total credits exceeds maxCredit
    const semesterRegistration = yield semesterRegistration_model_1.default.findById(isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.semesterRegistration).select("maxCredit");
    // console.log(semesterRegistration);
    const enrolledCourse = yield enrolledCourse_model_1.default.aggregate([
        {
            $match: {
                student: student._id,
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "enrolledCourseData",
            },
        },
        {
            $unwind: "$enrolledCourseData",
        },
        {
            $group: {
                _id: null,
                totalenrolledCredits: { $sum: "$enrolledCourseData.credits" },
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
    ]);
    const course = yield course_model_1.Courses.findById(isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.course).select("credits");
    // console.log(course);
    // console.log(enrolledCourse);
    const totalCredits = (enrolledCourse === null || enrolledCourse === void 0 ? void 0 : enrolledCourse.length) > 0 ? (_a = enrolledCourse[0]) === null || _a === void 0 ? void 0 : _a.totalenrolledCredits : 0;
    // console.log(totalCredits);
    if (semesterRegistration &&
        course &&
        totalCredits + (course === null || course === void 0 ? void 0 : course.credits) > (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCredit)) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This course is Exceeded the limit");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield enrolledCourse_model_1.default.create([
            {
                semesterRegistration: isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.semesterRegistration,
                academicSemester: isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.academicSemester,
                academicFaculty: isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.academicFaculty,
                academicDepartment: isOfferedCourseExists === null || isOfferedCourseExists === void 0 ? void 0 : isOfferedCourseExists.academicDepartment,
                offeredCourse: offeredCourse,
                course: isOfferedCourseExists.course,
                student: student._id,
                faculty: isOfferedCourseExists.faculty,
                isEnrolled: true,
            },
        ], { session });
        if (!result) {
            throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to Enroll in this course");
        }
        const maxCapacity = isOfferedCourseExists.maxCapacity - 1;
        yield OfferedCourse_model_1.OfferedCourse.findOneAndUpdate({ _id: offeredCourse }, {
            maxCapacity: maxCapacity,
        }, { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
    // return null;
});
const updateEnrolledCourseMarksIntoDB = (facultyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.default.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This semester is not found");
    }
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This offered Course is not found");
    }
    const isStudentExists = yield student_model_1.default.findById(student);
    // console.log(isStudentExists);
    if (!isStudentExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This student is not found");
    }
    const faculty = yield faculty_model_1.default.findOne({ id: facultyId }, { _id: 1 });
    // console.log(faculty._id);
    if (!faculty) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "You are not authorized in this course");
    }
    const isCourseBelongToFaculty = yield enrolledCourse_model_1.default.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty: faculty._id,
    });
    if (!isCourseBelongToFaculty) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "You Forbidden");
    }
    const modifiedData = Object.assign({}, courseMarks);
    if (courseMarks === null || courseMarks === void 0 ? void 0 : courseMarks.finalTerm) {
        const { classTest1, classTest2, midTerm, finalTerm } = courseMarks;
        const totalMarks = Math.ceil(classTest1 * 0.1) +
            Math.ceil(midTerm * 0.3) +
            Math.ceil(classTest2 * 0.1) +
            Math.ceil(finalTerm * 0.5);
        const result = (0, enrolledCourse_utils_1.calculateGradeAndPoints)(totalMarks);
        modifiedData.grade = result.grade;
        modifiedData.gradePoints = result.gradePoints;
        modifiedData.isCompleted = true;
    }
    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }
    // console.log(   isCourseBelongToFaculty?._id ,modifiedData);
    const result = yield enrolledCourse_model_1.default.findByIdAndUpdate(isCourseBelongToFaculty === null || isCourseBelongToFaculty === void 0 ? void 0 : isCourseBelongToFaculty._id, modifiedData, {
        new: true,
    });
    // console.log(result);
    return result;
});
exports.EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB,
};
