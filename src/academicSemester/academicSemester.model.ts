import { Error, Schema, model } from "mongoose";
import { TacademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterName,
} from "./academicSemester.constant";

const AcademicSemesterSchema = new Schema<TacademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterName,
    required: [true, "semester name is required"],
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: [true, "semester code name is required"],
  },
  year: {
    type: String,
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

AcademicSemesterSchema.pre("save", async function (next) {
  const isExisSemester = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isExisSemester) {
    throw new Error("Semester is alreary exists");
  }
  next();
});

export const AcademicSemesterModel = model<TacademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
