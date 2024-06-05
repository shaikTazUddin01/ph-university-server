import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.service";

const createFaculty = catchAsync(async (req, res) => {
  const result = await facultyServices.createFacultyInToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is creates successfully",
    data: result,
  });
});

export const facultyController = {
  createFaculty,
};
