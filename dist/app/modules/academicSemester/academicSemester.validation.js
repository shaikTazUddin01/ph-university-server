"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const CreateAcademicSemesterValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterName]),
        code: zod_1.z.enum(academicSemester_constant_1.AcademicSemesterCode),
        year: zod_1.z.string(),
        startMonth: zod_1.z.enum(academicSemester_constant_1.AcademicSemesterMonths),
        endMonth: zod_1.z.enum(academicSemester_constant_1.AcademicSemesterMonths),
    }),
});
exports.AcademicSemesterValidation = {
    CreateAcademicSemesterValidation,
};
