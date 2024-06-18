import { z } from "zod";

const loginValidetionSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required." }),
    password: z.string({ required_error: "password is required." }),
  }),
});
const passwordValidetionSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "old Password is required." }),
    newPassword: z.string({ required_error: "password is required." }),
  }),
});

const refreshtokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token in required",
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "User id is required",
    }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "User id is required",
    }),
    newPassword: z.string({
      required_error: "New Password is required",
    }),
  }),
});
export const AuthValidation = {
  loginValidetionSchema,
  passwordValidetionSchema,
  refreshtokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
