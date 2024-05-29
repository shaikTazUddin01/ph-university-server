import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../utils/cathcAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, studentInfo } = req.body;
  const result = await UserService.createStudentInToDB(password, studentInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is creates successfully",
    data: result,
  });
});

export const userController = {
  createStudent,
};
