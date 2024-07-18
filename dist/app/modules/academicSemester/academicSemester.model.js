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
exports.AcademicSemesterModel = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const AcademicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: academicSemester_constant_1.AcademicSemesterName,
        required: [true, "semester name is required"],
    },
    code: {
        type: String,
        enum: academicSemester_constant_1.AcademicSemesterCode,
        required: [true, "semester code name is required"],
    },
    year: {
        type: String,
        required: [true, "started is required"],
    },
    startMonth: {
        type: String,
        enum: academicSemester_constant_1.AcademicSemesterMonths,
        required: [true, "start month name is required"],
    },
    endMonth: {
        type: String,
        enum: academicSemester_constant_1.AcademicSemesterMonths,
        required: [true, "end month name is required"],
    },
}, { timestamps: true });
AcademicSemesterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExisSemester = yield exports.AcademicSemesterModel.findOne({
            year: this.year,
            name: this.name,
        });
        if (isExisSemester) {
            throw new mongoose_1.Error("Semester is alreary exists");
        }
        next();
    });
});
exports.AcademicSemesterModel = (0, mongoose_1.model)("AcademicSemester", AcademicSemesterSchema);
