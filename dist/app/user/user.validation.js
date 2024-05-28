"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = void 0;
const zod_1 = require("zod");
const userZodValidation = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "password must be string",
    })
        .max(20, { message: "password must into the 20 character" })
        .optional(),
});
exports.useValidation = {
    userZodValidation,
};
