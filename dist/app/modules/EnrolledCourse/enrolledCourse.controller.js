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
exports.EnrolledCourseControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const enrolledCourse_service_1 = require("./enrolledCourse.service");
const createEnrolledCourse = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user,req.body);
    const result = yield enrolledCourse_service_1.EnrolledCourseServices.createEnrolledCourseIntoDB(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student is enrolled succesfully',
        data: result,
    });
}));
const updateEnrolledCourseMarks = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyId = req.user.userId;
    // console.log(req.body);
    const result = yield enrolledCourse_service_1.EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(facultyId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Marks is updated succesfully',
        data: result,
    });
}));
exports.EnrolledCourseControllers = {
    createEnrolledCourse,
    updateEnrolledCourseMarks,
};
