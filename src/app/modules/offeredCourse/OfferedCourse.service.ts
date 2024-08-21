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
import StudentModel from "../student/student.model";

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
const getOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find()
    .populate("semesterRegistration")
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("course")
    .populate("faculty");

  return result;
};
const getOfferedSingleCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);

  return result;
};

// get my offercourse

const getMyOfferedCoursesFromDB = async (
  userId: string
  // query: Record<string, unknown>,
) => {
  //pagination setup

  // const page = Number(query?.page) || 1;
  // const limit = Number(query?.limit) || 10;
  // const skip = (page - 1) * limit;

  const student = await StudentModel.findOne({ id: userId });
  // find the student
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found");
  }
  // console.log(student);
  //find current ongoing semester
  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne(
    {
      status: "ONGOING",
    }
  );

  if (!currentOngoingRegistrationSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "There is no ongoing semester registration!"
    );
  }

  const result = await OfferedCourse.aggregate([
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester?._id,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$semesterRegistration",
                      "$$currentOngoingRegistrationSemester",
                    ],
                  },
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isEnrolled", true],
                  },
                ],
              },
            },
          },
        ],
        as: "enrolledCourses",
      },
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isCompleted", true],
                  },
                ],
              },
            },
          },
        ],
        as: "completedCourses",
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: "$completedCourses",
            as: "completed",
            in: "$$completed.course",
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
                  $or: [
                    { $eq: ['$course.perRequisteCourses', []] },
                    {
                      $setIsSubset: [
                        '$course.perRequisteCourses.course',
                        '$completedCourseIds',
                      ],
                    },
                  ],
                },



        isAlreadyEnrolled: {
          $in: [
            "course._id",
            {
              $map: {
                input: "$enrolledCourses",
                as: "enroll",
                in: "$$enroll.course",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled:true,
      },
    },
  ]);
  console.log("results-->", result);
  // console.log(currentOngoingRegistrationSemester);
  // const result = [
  //   {
  //     $match: {
  //       semesterRegistration: currentOngoingRegistrationSemester?._id,
  //       // academicFaculty: student.academicFaculty,
  //       academicDepartment: student.academicDepartment,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'courses',
  //       localField: 'course',
  //       foreignField: '_id',
  //       as: 'course',
  //     },
  //   },
  //   {
  //     $unwind: '$course',
  //   },
  //   {
  //     $lookup: {
  //       from: 'enrolledcourses',
  //       let: {
  //         currentOngoingRegistrationSemester:
  //           currentOngoingRegistrationSemester._id,
  //         currentStudent: student._id,
  //       },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 {
  //                   $eq: [
  //                     '$semesterRegistration',
  //                     '$$currentOngoingRegistrationSemester',
  //                   ],
  //                 },
  //                 {
  //                   $eq: ['$student', '$$currentStudent'],
  //                 },
  //                 {
  //                   $eq: ['$isEnrolled', true],
  //                 },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //       as: 'enrolledCourses',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'enrolledcourses',
  //       let: {
  //         currentStudent: student._id,
  //       },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 {
  //                   $eq: ['$student', '$$currentStudent'],
  //                 },
  //                 {
  //                   $eq: ['$isCompleted', true],
  //                 },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //       as: 'completedCourses',
  //     },
  //   },
  //   {
  //     $addFields: {
  //       completedCourseIds: {
  //         $map: {
  //           input: '$completedCourses',
  //           as: 'completed',
  //           in: '$$completed.course',
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $addFields: {
  //       isPreRequisitesFulFilled: {
  //         $or: [
  //           { $eq: ['$course.preRequisiteCourses', []] },
  //           {
  //             $setIsSubset: [
  //               '$course.preRequisiteCourses.course',
  //               '$completedCourseIds',
  //             ],
  //           },
  //         ],
  //       },

  //       isAlreadyEnrolled: {
  //         $in: [
  //           '$course._id',
  //           {
  //             $map: {
  //               input: '$enrolledCourses',
  //               as: 'enroll',
  //               in: '$$enroll.course',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     $match: {
  //       isAlreadyEnrolled: false,
  //       isPreRequisitesFulFilled: true,
  //     },
  //   },
  // ];

  // console.log(aggregationQuery);

  // const paginationQuery = [
  //   {
  //     $skip: skip,
  //   },
  //   {
  //     $limit: limit,
  //   },
  // ];

  // console.log(paginationQuery);

  // const result = await OfferedCourse.aggregate([
  //   ...aggregationQuery,
  //   ...paginationQuery,
  // ]);

  // const total = (await OfferedCourse.aggregate(aggregationQuery)).length;

  // const totalPage = Math.ceil(result.length / limit);

  return {
    // meta: {
    //   page,
    //   limit,
    //   total,
    //   totalPage,
    // },
    result,
  };
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getOfferedCourseFromDB,
  getOfferedSingleCourseFromDB,
  getMyOfferedCoursesFromDB,
};
