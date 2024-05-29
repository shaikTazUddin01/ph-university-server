import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.servce";
// import Joi from 'joi';
// import { studentValidationSchema } from './student.vaildation';
import { z } from "zod";
// import studentZodValidation from "./student.zod.validation";
import catchAsync from "../utils/cathcAsync";

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb();

  //sent response
  res.status(200).json({
    success: true,
    message: "student are retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentsFromDb(studentId);

  //sent response
  res.status(200).json({
    success: true,
    message: "student are retrieved successfully",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteSutdentFromDb(studentId);

  res.status(200).json({
    success: true,
    message: "student delete successFully",
    data: result,
  });
});

export const StudentControllers = {
  // crateStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
