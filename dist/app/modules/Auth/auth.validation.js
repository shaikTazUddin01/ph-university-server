"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidetionSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Id is required." }),
        password: zod_1.z.string({ required_error: "password is required." }),
    }),
});
const passwordValidetionSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: "old Password is required." }),
        newPassword: zod_1.z.string({ required_error: "password is required." }),
    }),
});
const refreshtokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token in required",
        }),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "User id is required",
        }),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "User id is required",
        }),
        newPassword: zod_1.z.string({
            required_error: "New Password is required",
        }),
    }),
});
exports.AuthValidation = {
    loginValidetionSchema,
    passwordValidetionSchema,
    refreshtokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
};
