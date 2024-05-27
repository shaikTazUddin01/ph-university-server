import { z } from "zod";

const userZodValidation = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: "password must into the 20 character" }),
  newPasswordChange: z.boolean().default(true),
  role: z.enum(["user", "admin", "faculty"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().default(false),
});

export const useValidation = {
  userZodValidation,
};
