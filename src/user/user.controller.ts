import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (

  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  // console.log(req.body);
  const { password, studentInfo } = req.body;
  const result = await UserService.createStudentInToDB(password, studentInfo);


    // res.json({
    //   success: true,
    //   messages: "successfully create a user",
    //   data: result,
    // });
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Student is creates successfully',
      data:result
    })
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
