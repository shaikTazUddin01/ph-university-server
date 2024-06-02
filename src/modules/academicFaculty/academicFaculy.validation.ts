import { z } from "zod";

const AcademicFacultyValidation = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
});


export default AcademicFacultyValidation