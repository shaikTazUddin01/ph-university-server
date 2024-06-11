import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { AcademicFaculty } from "../academicFaculty/acdemicFaculty.model";
import Faculty from "../Faculty/faculty.model";
import { Courses } from "../courses/course.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    faculty,
    course,
    academicDepartment,
    academicFaculty,
    semesterRegistration,
  } = payload;

  //check if the semester registration id is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "semester registration not found");
  }


const academicSemester =isSemesterRegistrationExists?.academicSemester


  //check if the academicSemester id is exists
  const isAcademicSemesterExists = await AcademicSemesterModel.findById(
    academicSemester
  );

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "academic semester not found");
  }
  //check if the academicDepartment id is exists
  const isacademicDepartmentExists = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isacademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found");
  }
  //check if the academic Faculty id is exists
  const isAcademicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
  }
  //check if the faculty id is exists
  const isfacultyExists = await Faculty.findById(faculty);

  if (!isfacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found");
  }
  //check if the course id is exists
  const iscourse = await Courses.findById(course);

  if (!iscourse) {
    throw new AppError(httpStatus.NOT_FOUND, "course is not found");
  }

  //create offeredCourse
  const result = await OfferedCourse.create({...payload,academicSemester});
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
