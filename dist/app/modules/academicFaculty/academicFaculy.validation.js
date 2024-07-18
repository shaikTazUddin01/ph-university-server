"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require("zod");
const CreateAcademicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        academicFaculty: zod_1.z.object({
            name: zod_1.z.string({
                required_error: "Name is required",
            }),
        }),
    }),
});
exports.AcademicFacultyValidation = {
    CreateAcademicFacultyValidation,
};
