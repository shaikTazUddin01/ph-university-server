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
import { hasTimeConflict } from "./offerrdCourse.utiles";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    faculty,
    course,
    academicDepartment,
    academicFaculty,
    semesterRegistration,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  //check if the semester registration id is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "semester registration not found");
  }

  const academicSemester = isSemesterRegistrationExists?.academicSemester;

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

  //check if ther department is belong to the faculty

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this ${isacademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
    );
  }

  //check if the same course same section in same registered semester exists

  const isSameCourseSameSectionInSameRegisteredSemesterExists =
    await OfferedCourse.findOne({
      academicSemester,
      course,
      section,
    });

  if (isSameCourseSameSectionInSameRegisteredSemesterExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The same course same section in same registered semester do not entry`
    );
  }
  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  console.log(assignedSchedules);
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not abaliable at this time`
    );
  }
  //create offeredCourse
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, `offered course not found !`);
  }
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, `Faculty not found !`);
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (semesterRegistrationStatus?.status !== "UPCOMING") {
 
  throw new AppError(
    httpStatus.BAD_REQUEST,
    `you can not update this offerd course`
  );
}
  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  console.log(assignedSchedules);

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not abaliable at this time`
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};


//get add offered course
const getOfferedCourseFromDB=async()=>{
    const result =await OfferedCourse.find()
    
    return result
}
const getOfferedSingleCourseFromDB=async(id :string)=>{
    const result =await OfferedCourse.findById(id)
    
    return result
}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getOfferedCourseFromDB,
  getOfferedSingleCourseFromDB
};
