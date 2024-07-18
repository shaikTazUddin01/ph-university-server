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
exports.courseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_service_1 = require("./course.service");
const createCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.createCourseInToDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "successfully created a course",
        data: result,
    });
}));
const findCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.findCourseFormDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "successfully retrieve courses",
        data: result,
    });
}));
const findSingleCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.findSingleCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "successfully retrieve  course",
        data: result,
    });
}));
const DeleteCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.DeleteCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "successfully delete a course",
        data: result,
    });
}));
const updateCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.updateCourseInToDB(id, req.body);
    // console.log(result);
    if (result == null) {
        throw new Error("course update failed");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "course update successfully",
        data: result,
    });
}));
const assignFacultiesWithCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);
    //  console.log(faculties ,courseId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "course faculties update successfully",
        data: result,
    });
}));
const removedFacultiesWithCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.removedFacultiesWithCourseIntoDB(courseId, faculties);
    //  console.log(faculties ,courseId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "course faculties removed successfully",
        data: result,
    });
}));
exports.courseController = {
    createCourse,
    findCourse,
    findSingleCourse,
    DeleteCourse,
    updateCourse,
    assignFacultiesWithCourse,
    removedFacultiesWithCourse
};
