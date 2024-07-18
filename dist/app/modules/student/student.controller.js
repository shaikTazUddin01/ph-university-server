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
exports.StudentControllers = void 0;
const student_servce_1 = require("./student.servce");
// import studentZodValidation from "./student.zod.validation";
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const getAllStudent = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_servce_1.StudentServices.getAllStudentsFromDb(req === null || req === void 0 ? void 0 : req.query);
    // console.log(req.query);
    //sent response
    res.status(200).json({
        success: true,
        message: "student are retrieved successfully",
        data: result,
    });
}));
const getSingleStudent = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_servce_1.StudentServices.getSingleStudentsFromDb(id);
    //sent response
    res.status(200).json({
        success: true,
        message: "student are retrieved successfully",
        data: result,
    });
}));
const deleteStudent = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_servce_1.StudentServices.deleteSutdentFromDb(id);
    res.status(200).json({
        success: true,
        message: "student delete successFully",
        data: result,
    });
}));
const updateStudent = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentInfo } = req.body;
    const { id } = req.params;
    const result = yield student_servce_1.StudentServices.updateStudentIntoDB(id, studentInfo);
    res.status(200).json({
        success: true,
        message: "student update successFully",
        data: result,
    });
}));
exports.StudentControllers = {
    // crateStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent,
    updateStudent
};
