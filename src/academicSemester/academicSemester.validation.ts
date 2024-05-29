import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterName,
} from "./academicSemester.const";

const CreateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum(AcademicSemesterCode as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum(AcademicSemesterMonths as [string, ...string[]]),
    endMonth: z.enum(AcademicSemesterMonths as [string, ...string[]]),
  }),
});


export const AcademicSemesterValidation={
    CreateAcademicSemesterValidation
}