"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_servce_1 = require("./student.servce");
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
const getAllStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_servce_1.StudentServices.getAllStudentsFromDb();
        //sent response
        res.status(200).json({
            success: true,
            message: 'student are retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        // res.status(500).json({
        //   success: false,
        //   message: error,
        //   error: error,
        // });
        next(error);
    }
});
const getSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_servce_1.StudentServices.getSingleStudentsFromDb(studentId);
        // const result = await StudentServices.getSingleStudentsFromDb(studentId);
        //sent response
        res.status(200).json({
            success: true,
            message: 'student are retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_servce_1.StudentServices.deleteSutdentFromDb(studentId);
        res.status(200).json({
            success: true,
            message: 'student delete successFully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.StudentControllers = {
    // crateStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent,
};
