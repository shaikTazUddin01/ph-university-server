import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import config from "../../config";
import Student from "../student/student.interface";
import StudentModel from "../student/student.model";
import { Tuser } from "./user.interface";
// import { NewUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId, lastAdminId, lastFacultyId } from "./user.utils";
import mongoose from "mongoose";
import { AppError } from "../../errors/AppErrors";
import httpStatus from "http-status";
import { TacademicSemester } from "../academicSemester/academicSemester.interface";
import { TFaculty } from "../Faculty/faculty.interface";
import Faculty from "../Faculty/faculty.model";
import { TAdmin } from "../Admin/admin.interface";
import Admin from "../Admin/admin.model";
// import { deCoded } from "../Auth/auth.utils";
// import jwt,{ JwtPayload } from "jsonwebtoken";
// import { deCodedToken } from "../Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { sendImageToCloudinary } from "../../utils/sendImageToClodinary";

//create student
const createStudentInToDB = async (
  password: string,
  payload: Student,
  filePath: string
) => {
  //create a user object
  const userData: Partial<Tuser> = {};

  // console.log(password);
  //if password is not given ,use deafult
  userData.password = password || (config.default_pass as string);

  //set student role

  userData.role = "student";
  //set user email
  userData.email = payload?.email;

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //manually generated it
    userData.id = await generateStudentId(
      admissionSemester as TacademicSemester
    );

    //create a user(transaction - 1 )
    const newUser = await User.create([userData], { session });

    // console.log("user", newUser);
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference_id

    //create a student (transaction- 2)
    const fileName = `${payload?.name?.firstName}${userData.id}`;
    //send image to cloudinary
    const profileImg  = await sendImageToCloudinary(filePath, fileName);
// console.log(secure_url);
    const newStudent = await StudentModel.create([{...payload,profileImg}], {
      session,
    });

    // console.log("new student", newStudent);
    if (!newStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "failed to create new student"
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    console.log(error);
    // console.log(object);
    await session.abortTransaction();
    await session.endSession();
  }
};

//create Faculty
const createFacultyInToDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || config.default_pass;
  userData.role = "faculty";
  //set user email
  userData.email = payload?.email;
  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();
  const newId = await lastFacultyId();

  console.log("ID", newId);
  payload.id = newId;
  userData.id = newId;

  const newUser = await User.create(
    userData
    // , { session }
  );
  console.log(newUser);
  const newFaculty = await Faculty.create(
    payload
    // , { session }
  );

  // await session.abortTransaction();
  // await session.endSession();

  return newFaculty;
  // } catch (error) {
  //   console.log(error);
  //   await session.abortTransaction();
  //   await session.endSession();
  // }
};
//create admin
const createAdminInToDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || config.default_pass;
  userData.role = "admin";
  //set user email
  userData.email = payload?.email;
  const newId = await lastAdminId();

  // console.log('ID',newId);
  payload.id = newId;
  userData.id = newId;

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const newUser = await User.create(userData);

  const newAdmin = await Admin.create(payload);

  return newAdmin;
};

const getMe = async (token: JwtPayload) => {
  let result = null;
  const { userId, role } = token;

  if (role === "student") {
    result = await StudentModel.findOne({ id: userId }).populate("user");
  }
  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  }
  if (role === "faculty") {
    result = await Faculty.findOne({ id: userId }).populate("user");
  }

  return result;
};

const changeStatus = async (
  id: string,
  payload: {
    status: string;
  }
) => {
  // console.log(id);
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
export const UserService = {
  createStudentInToDB,
  createFacultyInToDB,
  createAdminInToDB,
  getMe,
  changeStatus,
};
