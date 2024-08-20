import { Schema, model } from "mongoose";
import { TCourses, TFacultyWithCourse, TPerRequisteCourses } from "./course.interface";

const perRequisteCourseSchema = new Schema<TPerRequisteCourses>({
  courses: {
    type: Schema.Types.ObjectId,
    ref:'course'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourses>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    prefix: {
      type: String,
      // required: true 
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default:false
    },
    perRequisteCourses: [perRequisteCourseSchema],
  },
  { timestamps: true }
);

export const Courses = model<TCourses>("course", courseSchema);

const FacultiesWithCourse =new Schema<TFacultyWithCourse>({
  course:{
    type:Schema.Types.ObjectId,
    unique:true,
    ref:'course'
  },
  faculties:[{
    type:Schema.Types.ObjectId,
    ref:'Faculty'
  }]
})

export const FacultyCourse= model<TFacultyWithCourse>("facultiesWithCourse",FacultiesWithCourse)