import catchAsync from "../utils/cathcAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { academicSemesterService } from "./academicSemester.serviecs";

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemester = req.body;
  const result = await academicSemesterService.createAcademicSemesterInToDB(
    academicSemester
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "academic semester is creates successfully",
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
};
