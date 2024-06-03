import { z } from "zod";

const CreateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    academicFaculty: z.string({
      required_error: "academicFaculty is required",
    }),
  }),
});
const UpdateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: "academicFaculty is required",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  CreateAcademicDepartmentValidation,
  UpdateAcademicDepartmentValidation,
};
