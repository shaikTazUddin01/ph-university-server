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
exports.facultyController = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const faculty_service_1 = require("./faculty.service");
// const createFaculty = catchAsync(async (req, res) => {
//   const result = await facultyServices.createFacultyInToDB(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Faculty is creates successfully",
//     data: result,
//   });
// });
const findAllFaculty = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("test",req.user);
    console.log(req.cookies);
    const result = yield faculty_service_1.facultyServices.findAllFacultyFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully retrieve faculty data",
        data: result
    });
}));
const findSingleFaculty = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield faculty_service_1.facultyServices.findSingleFacultyFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully retrieve faculty data",
        data: result
    });
}));
const updateFaculty = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('update');
    const { id } = req.params;
    const { facultyInFo } = req.body;
    const result = yield faculty_service_1.facultyServices.updateFacultyInToDB(id, facultyInFo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully update faculty data",
        data: result
    });
}));
const deleteFaculty = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield faculty_service_1.facultyServices.deleteFacultyIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully delete this faculty",
        data: "deleted"
    });
}));
exports.facultyController = {
    // createFaculty,
    findAllFaculty,
    findSingleFaculty,
    updateFaculty,
    deleteFaculty
};
