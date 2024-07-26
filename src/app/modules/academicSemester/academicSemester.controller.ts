import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { academicSemesterService } from "./academicSemester.serviecs";

const createAcademicSemester = catchAsync(async (req, res) => {
  // const academicSemester = req.body;
  console.log(req.body);
 
  const result = await academicSemesterService.createAcademicSemesterInToDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "academic semester is creates successfully",
    data: result,
  });
});

const findAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.findAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "success find all academic semester",
    data: result,
  });
});
const findAcademicSemesterById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicSemesterService.findAcademicSemesterFromDBById(
    id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "success find all academic semester",
    data: result,
  });
});

const updateAcademicSemesterById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await academicSemesterService.updateAcademicSemesterFromDBById(
    id,
    updatedData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "success find all academic semester",
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  findAcademicSemester,
  findAcademicSemesterById,
  updateAcademicSemesterById,
};
