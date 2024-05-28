import { z } from "zod";

const userZodValidation = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, { message: "password must into the 20 character" })
    .optional(),
});

export const useValidation = {
  userZodValidation,
};
