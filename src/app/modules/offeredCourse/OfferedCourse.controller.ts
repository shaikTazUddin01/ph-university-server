import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/cathcAsync';
import { OfferedCourseServices } from './OfferedCourse.service';
import sendResponse from '../../utils/sendResponse';


const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created successfully !',
    data: result,
  });
});


export const OfferedCourseControllers = {
  createOfferedCourse,

};