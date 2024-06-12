// import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";


const createStudent = catchAsync(async (req, res) => {
  const { password, studentInfo } = req.body;
  console.log(req.body);
  const result = await UserService.createStudentInToDB(password, studentInfo);

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
export const userController = {
  createStudent,
  createFaculty,
  createAdmin
};
