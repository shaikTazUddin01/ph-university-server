import {  z } from "zod";
import { UserStatus } from "./user.constant";

const userZodValidation = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, { message: "password must into the 20 character" })
    .optional(),
});



const changeStatusValidationSchema=z.object({
  body:z.object({
    status:z.enum([...UserStatus] as [string,...string[]])
  })
})

export const useValidation = {
  userZodValidation,
  changeStatusValidationSchema
};
