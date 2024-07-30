// import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
// import { AppError } from "../../errors/AppErrors";
import { JwtPayload } from "jsonwebtoken";


const createStudent = catchAsync(async (req, res) => {

// console.log();
console.log(req.body);
  const { password, studentInfo } = req.body;
  // console.log(req.body);
  const result = await UserService.createStudentInToDB(password, studentInfo,req?.file?.path as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is creates successfully",
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, facultyInfo } = req.body;
  console.log(password);
  const result = await UserService.createFacultyInToDB(password, facultyInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculty is creates successfully",
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, adminInfo } = req.body;
  // console.log(adminInfo);
  const result = await UserService.createAdminInToDB(password, adminInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin is creates successfully",
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {

  const result= await UserService.getMe(req.user as JwtPayload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "userr is retrieve successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
const id=req.params.id
// console.log(id);
  const result= await UserService.changeStatus(id,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "userr is retrieve successfully",
    data: result,
  });
});
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe
};
