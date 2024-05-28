import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.servce';
// import Joi from 'joi';
// import { studentValidationSchema } from './student.vaildation';
import { z } from 'zod';
import studentZodValidation from './student.zod.validation';

// const crateStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;

//     // data validation using joi
//     // const { error, value } = studentValidationSchema.validate(studentData);
//     // console.log({error}, {value});
//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'student is created successfully',
//     //     error: error.details,
//     //   });
//     // }
//     //zod validation

//     const zodStudent = studentZodValidation.parse(studentData);

//     const result = await StudentServices.createStudentIntoDB(zodStudent);

//     //sent response
//     res.status(200).json({
//       success: true,
//       message: 'student is created successfully',
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error,
//       error: error,
//     });
//   }
// };

const getAllStudent = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();

    //sent response
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error,
    //   error: error,
    // });
    next(error)
  }
};

const getSingleStudent = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentsFromDb(studentId);
    // const result = await StudentServices.getSingleStudentsFromDb(studentId);

    //sent response
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const deleteStudent = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSutdentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: 'student delete successFully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const StudentControllers = {
  // crateStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
