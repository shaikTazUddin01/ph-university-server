import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.body);
  const { password, studentInfo } = req.body;
  const result = await UserService.createStudentInToDB(password, studentInfo);

  try {
    res.json({
      success: true,
      messages: "successfully create a user",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
