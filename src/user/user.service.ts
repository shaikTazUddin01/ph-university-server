import config from "../config";
import Student from "../student/seudent.interface";
import StudentModel from "../student/student.model";
import { Tuser } from "./user.interface";
// import { NewUser } from "./user.interface";
import { User } from "./user.model";

const createStudentInToDB = async (password: string, studentData: Student) => {
  //create a user object
  const userData: Partial<Tuser> = {};

  //if password is not given ,use deafult
  userData.password = password || (config.default_pass as string);
  // if (!password) {
  //     user.password=config.default_pass as string ;
  // }else{
  //     user.password=password
  // }

  //set student role

  userData.role = "student";

  //manually generated it

  userData.id = "2030100001";

  //create a user

  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference_id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentInToDB,
};
