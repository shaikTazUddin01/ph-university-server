"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const CreateAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        academicFaculty: zod_1.z.string({
            required_error: "academicFaculty is required",
        }),
    }),
});
const UpdateAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "name is required",
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            required_error: "academicFaculty is required",
        })
            .optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    CreateAcademicDepartmentValidation,
    UpdateAcademicDepartmentValidation,
};
