import { string } from "zod";
import { TacademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import config from "../../config";
import Student from "../student/student.interface";
import StudentModel from "../student/student.model";
import { Tuser } from "./user.interface";
// import { NewUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentInToDB = async (password: string, payload: Student) => {
  //create a user object
  const userData: Partial<Tuser> = {};

  //if password is not given ,use deafult
  userData.password = password || (config.default_pass as string);

  //set student role

  userData.role = "student";

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );

  //manually generated it
  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData);

  console.log("user", newUser);
  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference_id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentInToDB,
};
