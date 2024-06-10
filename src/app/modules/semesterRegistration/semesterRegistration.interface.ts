import { Types } from "mongoose"

export type TSemesterRegistration={
    academicSemester:Types.ObjectId;
    status:'UPCAMING'|'ONGOING'|'ENDED';
    startDate:Date;
    endDate:Date;
    minCredit:number;
    maxCredit:number;
}