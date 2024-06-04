import { z } from "zod";


const CreateAcademicFacultyValidation = z.object({
  body: z.object({
    academicFaculty: z.object({
      name: z.string({
        required_error: "Name is required",
      }),
    }),
  }),
});

export const AcademicFacultyValidation = {
  CreateAcademicFacultyValidation,
};
