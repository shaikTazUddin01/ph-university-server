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
exports.academicDepartmentController = void 0;
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const academicDepartment_service_1 = require("./academicDepartment.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createAcademicDepartment = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = req.body;
    // console.log("acadept--=>>",academicDepartment);
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.CreateAcademicDepartmentInToDB(academicDepartment);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Department create successFully",
        data: result,
    });
}));
const getAcademicDepartment = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.GetAcademicDepartmentFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Department find successFully",
        data: result,
    });
}));
const getAcademicDepartmentById = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.GetAcademicDepartmentFromDBById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Department find successFully",
        data: result,
    });
}));
const updateAcademicDepartmentById = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const academicDepartment = req.body;
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.UPdateAcademicDepartmentFromDB(id, academicDepartment);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "academic Department updated successFully",
        data: result,
    });
}));
exports.academicDepartmentController = {
    createAcademicDepartment,
    getAcademicDepartment,
    getAcademicDepartmentById,
    updateAcademicDepartmentById,
};
