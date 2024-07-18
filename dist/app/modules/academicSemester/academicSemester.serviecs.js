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
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterService = void 0;
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const createAcademicSemesterInToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterNameCodeMapper[data.name] !== data.code) {
        throw new Error("Invalid Semester code");
    }
    const result = yield academicSemester_model_1.AcademicSemesterModel.create(data);
    return result;
});
const findAcademicSemesterFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemesterModel.find();
    return result;
});
const findAcademicSemesterFromDBById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemesterModel.findById(id);
    return result;
});
const updateAcademicSemesterFromDBById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterNameCodeMapper[data === null || data === void 0 ? void 0 : data.name] !== (data === null || data === void 0 ? void 0 : data.code)) {
        throw new Error("Invalid Semester code");
    }
    const result = yield academicSemester_model_1.AcademicSemesterModel.findByIdAndUpdate(id, data, {
        returnOriginal: false,
    });
    return result;
});
exports.academicSemesterService = {
    createAcademicSemesterInToDB,
    findAcademicSemesterFromDB,
    findAcademicSemesterFromDBById,
    updateAcademicSemesterFromDBById,
};
