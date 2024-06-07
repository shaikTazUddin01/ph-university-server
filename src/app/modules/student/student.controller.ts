import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.servce";
// import Joi from 'joi';
// import { studentValidationSchema } from './student.vaildation';
import { z } from "zod";
// import studentZodValidation from "./student.zod.validation";
import catchAsync from "../../utils/cathcAsync";

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb(req?.query);
// console.log(req.query);
  //sent response
  res.status(200).json({
    success: true,
    message: "student are retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentServices.getSingleStudentsFromDb(id);

  //sent response
  res.status(200).json({
    success: true,
    message: "student are retrieved successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSutdentFromDb(id);

  res.status(200).json({
    success: true,
    message: "student delete successFully",
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const {studentInfo} = req.body;
  const { id } = req.params;
  const result = await StudentServices.updateStudentIntoDB(id,studentInfo);

  res.status(200).json({
    success: true,
    message: "student update successFully",
    data: result,
  });
});
export const StudentControllers = {
  // crateStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
