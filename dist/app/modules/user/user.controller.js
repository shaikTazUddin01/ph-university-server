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
exports.userController = void 0;
// import { NextFunction, Request, RequestHandler, Response } from "express";
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const createStudent = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log();
    // console.log(req.body);
    const { password, studentInfo } = req.body;
    // console.log(req.body);
    const result = yield user_service_1.UserService.createStudentInToDB(password, studentInfo, (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student is creates successfully",
        data: result,
    });
}));
const createFaculty = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, facultyInfo } = req.body;
    console.log(password);
    const result = yield user_service_1.UserService.createFacultyInToDB(password, facultyInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "faculty is creates successfully",
        data: result,
    });
}));
const createAdmin = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, adminInfo } = req.body;
    // console.log(adminInfo);
    const result = yield user_service_1.UserService.createAdminInToDB(password, adminInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "admin is creates successfully",
        data: result,
    });
}));
const getMe = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getMe(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "userr is retrieve successfully",
        data: result,
    });
}));
const changeStatus = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log(id);
    const result = yield user_service_1.UserService.changeStatus(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "userr is retrieve successfully",
        data: result,
    });
}));
exports.userController = {
    createStudent,
    createFaculty,
    createAdmin,
    changeStatus,
    getMe
};
