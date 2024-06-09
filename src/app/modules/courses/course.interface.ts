import { Types } from "mongoose";

export type TPerRequisteCourses={
    courses:Types.ObjectId;
    isDeleted:boolean
}


export type TCourses={
    title:string;
    prefix:string;
    code:number;
    credits:number;
    isDeleted:boolean;
    perRequisteCourses:[TPerRequisteCourses]
}