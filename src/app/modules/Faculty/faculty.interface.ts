import { Types } from "mongoose";

export type TFaculty = {
  id: string;
  designation: string;
  name: string;
  gender: "Male" | "Female";
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: false;
};
