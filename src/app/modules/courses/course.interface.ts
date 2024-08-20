import { Types } from "mongoose";

export type TPerRequisteCourses={
    courses:Types.ObjectId;
    isDeleted:boolean
}


export type TCourses={
    title:string;
    prefix?:string;
    code:string;
    credits:number;
    isDeleted:boolean;
    perRequisteCourses:[TPerRequisteCourses]
}
export type TFacultyWithCourse={
    course:Types.ObjectId;
    faculties:[Types.ObjectId]
}