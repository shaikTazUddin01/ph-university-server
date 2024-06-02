import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.inerface";

const academicFacaltySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFacaltySchema
);
