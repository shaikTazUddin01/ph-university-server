import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import config from "../../config";
import Student from "../student/student.interface";
import StudentModel from "../student/student.model";
import { Tuser } from "./user.interface";
// import { NewUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId, lastFacultyId } from "./user.utils";
import mongoose from "mongoose";
import { AppError } from "../../errors/AppErrors";
import httpStatus from "http-status";
import { TacademicSemester } from "../academicSemester/academicSemester.interface";
import { TFaculty } from "../Faculty/faculty.interface";
import Faculty from "../Faculty/faculty.model";

//create student
const createStudentInToDB = async (password: string, payload: Student) => {
  //create a user object
  const userData: Partial<Tuser> = {};

  // console.log(password);
  //if password is not given ,use deafult
  userData.password = password || (config.default_pass as string);

  //set student role

  userData.role = "student";

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

    const newStudent = await StudentModel.create([payload], { session });

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
    await session.abortTransaction();
    await session.endSession();
  }
};

//create Faculty
const createFacultyInToDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || config.default_pass;
  userData.role = "faculty";

  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();
    const newId = await lastFacultyId();

    console.log('ID',newId);
    payload.id = newId;
    userData.id = newId;

  
    const newUser = await User.create(userData
      // , { session }
    );
console.log(newUser);
    const newFaculty = await Faculty.create(payload
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

export const UserService = {
  createStudentInToDB,
  createFacultyInToDB,
};
