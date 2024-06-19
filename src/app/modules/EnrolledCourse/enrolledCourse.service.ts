import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { OfferedCourse } from "../offeredCourse/OfferedCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import EnrolledCourse from "./enrolledCourse.model";
import StudentModel from "../student/student.model";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  /**
   * Step1: Check if the offered cousres is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */
  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "offered course is not found");
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Room is full");
  }

  const student = await StudentModel.findOne({ id: userId }).select("_id");
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "student is not found");
  }
  const isStudentAlreadyEnroll = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnroll) {
    throw new AppError(httpStatus.NOT_FOUND, "This course is already enrolled");
  }

  // const result = await EnrolledCourse.create(payload)

  return null;
};

//   facultyId: string,
//   payload: Partial<TEnrolledCourse>,
// ) => {
//   const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

//   const isSemesterRegistrationExists =
//     await SemesterRegistration.findById(semesterRegistration);

//   if (!isSemesterRegistrationExists) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'Semester registration not found !',
//     );
//   }

//   const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

//   if (!isOfferedCourseExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
//   }
//   const isStudentExists = await Student.findById(student);

//   if (!isStudentExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
//   }

//   const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });

//   if (!faculty) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
//   }

//   const isCourseBelongToFaculty = await EnrolledCourse.findOne({
//     semesterRegistration,
//     offeredCourse,
//     student,
//     faculty: faculty._id,
//   });

//   if (!isCourseBelongToFaculty) {
//     throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden! !');
//   }

//   const modifiedData: Record<string, unknown> = {
//     ...courseMarks,
//   };

//   if (courseMarks?.finalTerm) {
//     const { classTest1, classTest2, midTerm, finalTerm } =
//       isCourseBelongToFaculty.courseMarks;

//     const totalMarks =
//       Math.ceil(classTest1 * 0.1) +
//       Math.ceil(midTerm * 0.3) +
//       Math.ceil(classTest2 * 0.1) +
//       Math.ceil(finalTerm * 0.5);

//     const result = calculateGradeAndPoints(totalMarks);

//     modifiedData.grade = result.grade;
//     modifiedData.gradePoints = result.gradePoints;
//     modifiedData.isCompleted = true;
//   }

//   if (courseMarks && Object.keys(courseMarks).length) {
//     for (const [key, value] of Object.entries(courseMarks)) {
//       modifiedData[`courseMarks.${key}`] = value;
//     }
//   }

//   const result = await EnrolledCourse.findByIdAndUpdate(
//     isCourseBelongToFaculty._id,
//     modifiedData,
//     {
//       new: true,
//     },
//   );

//   return result;
// };

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  //   updateEnrolledCourseMarksIntoDB,
};
