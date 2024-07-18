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
exports.academicFacultyController = void 0;
const academicFaculty_service_1 = require("./academicFaculty.service");
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createAcademicFaculty = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { academicFaculty } = req.body;
    console.log(academicFaculty);
    const result = yield academicFaculty_service_1.AcademicFacultyServices.CreateAcademicFacultyInToDB(academicFaculty);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Faculty create successFully",
        data: result,
    });
}));
const getAcademicFaculty = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.AcademicFacultyServices.GetAcademicFacultyFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Faculty find successFully",
        data: result,
    });
}));
const getAcademicFacultyById = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicFaculty_service_1.AcademicFacultyServices.GetAcademicFacultyFromDBById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Faculty find successFully",
        data: result,
    });
}));
const updateAcademicFacultyById = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { academicFaculty } = req.body;
    const result = yield academicFaculty_service_1.AcademicFacultyServices.UPdateAcademicFacultyFromDB(id, academicFaculty);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Faculty find successFully",
        data: result,
    });
}));
exports.academicFacultyController = {
    createAcademicFaculty,
    getAcademicFaculty,
    getAcademicFacultyById,
    updateAcademicFacultyById
};
