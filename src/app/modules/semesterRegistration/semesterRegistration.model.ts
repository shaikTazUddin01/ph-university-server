import { Schema, model, Types } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


const SemesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: "UPCAMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default:3
    },
    maxCredit:{
        type:Number,
        default:15
    }
  },
  { timestamps: true }
);

const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  SemesterRegistrationSchema
);

export default SemesterRegistration;
