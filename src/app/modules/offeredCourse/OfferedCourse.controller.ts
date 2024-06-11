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

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const {id}=req.params
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is updated successfully !',
    data: result,
  });
});
const getOfferedCourse = catchAsync(async (req: Request, res: Response) => {
 
  const result = await OfferedCourseServices.getOfferedCourseFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is retrieve successfully!',
    data: result,
  });
});
const getsingleOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const {id}=req.params
  const result = await OfferedCourseServices.getOfferedSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is retrieve successfully!',
    data: result,
  });
});



export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getsingleOfferedCourse,
  getOfferedCourse
};