import { Schema, model } from "mongoose";
import { Month, TacademicSemester } from "./academicSemester.interface";

const months : Month[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AcademicSemesterSchema = new Schema<TacademicSemester>({
  name: {
    type: String,
    enum: ["Autumn", "Summar", "fall"],
    required: [true, "semester name is required"],
  },
  code: {
    type: String,
    enum: ["01", "02", "03"],
    required: [true, "semester code name is required"],
  },
  year: {
    type: Date,
    required: [true, "started is required"],
  },
  startMonth: {
    type: String,
    enum: months,
    required: [true, "start month name is required"],
  },
  endMonth: {
    type: String,
    enum: months,
    required: [true, "end month name is required"],
  },
});

export const AcademicSemesterModel = model<TacademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
