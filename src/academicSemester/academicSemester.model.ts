import { Schema, model } from "mongoose";
import {  TacademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterMonths, AcademicSemesterName } from "./academicSemester.const";






const AcademicSemesterSchema = new Schema<TacademicSemester>({
  name: {
    type: String,
    enum:AcademicSemesterName,
    required: [true, "semester name is required"],
  },
  code: {
    type: String,
    enum:AcademicSemesterCode,
    required: [true, "semester code name is required"],
  },
  year: {
    type: Date,
    required: [true, "started is required"],
  },
  startMonth: {
    type: String,
    enum: AcademicSemesterMonths,
    required: [true, "start month name is required"],
  },
  endMonth: {
    type: String,
    enum: AcademicSemesterMonths,
    required: [true, "end month name is required"],
  },
});

export const AcademicSemesterModel = model<TacademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
