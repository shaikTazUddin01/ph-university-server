import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/cathcAsync';
import { EnrolledCourseServices } from './enrolledCourse.service';


const createEnrolledCourse = catchAsync(async (req, res) => {

  console.log(req.user,req.body);

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });
});

// const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
//   const facultyId = req.user.userId;
//   const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
//     facultyId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Marks is updated succesfully',
//     data: result,
//   });
// });

export const EnrolledCourseControllers = {
  createEnrolledCourse,
//   updateEnrolledCourseMarks,
};