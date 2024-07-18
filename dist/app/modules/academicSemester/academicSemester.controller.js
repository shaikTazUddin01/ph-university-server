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
exports.academicSemesterController = void 0;
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const academicSemester_serviecs_1 = require("./academicSemester.serviecs");
const createAcademicSemester = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = req.body;
    const result = yield academicSemester_serviecs_1.academicSemesterService.createAcademicSemesterInToDB(academicSemester);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic semester is creates successfully",
        data: result,
    });
}));
const findAcademicSemester = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_serviecs_1.academicSemesterService.findAcademicSemesterFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "success find all academic semester",
        data: result,
    });
}));
const findAcademicSemesterById = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicSemester_serviecs_1.academicSemesterService.findAcademicSemesterFromDBById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "success find all academic semester",
        data: result,
    });
}));
const updateAcademicSemesterById = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield academicSemester_serviecs_1.academicSemesterService.updateAcademicSemesterFromDBById(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "success find all academic semester",
        data: result,
    });
}));
exports.academicSemesterController = {
    createAcademicSemester,
    findAcademicSemester,
    findAcademicSemesterById,
    updateAcademicSemesterById,
};
