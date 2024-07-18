"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatecourseValidation = void 0;
const zod_1 = require("zod");
const perRequisteCoursesvalidation = zod_1.z.object({
    courses: zod_1.z.string(),
});
const courseValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        perRequisteCourses: zod_1.z.array(perRequisteCoursesvalidation).optional(),
    }),
});
exports.updatecourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prefix: zod_1.z.string().optional(),
        code: zod_1.z.number().optional(),
        credits: zod_1.z.number().optional(),
        perRequisteCourses: zod_1.z.array(perRequisteCoursesvalidation).optional(),
    }),
});
exports.default = courseValidation;
