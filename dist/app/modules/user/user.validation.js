"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const userZodValidation = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "password must be string",
    })
        .max(20, { message: "password must into the 20 character" })
        .optional(),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...user_constant_1.UserStatus])
    })
});
exports.useValidation = {
    userZodValidation,
    changeStatusValidationSchema
};
