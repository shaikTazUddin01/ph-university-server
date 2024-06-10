import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationInToDB(
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "semester create successfully",
    data: result,
  });
});

const findSemesterRegistration = catchAsync(async (req, res) => {});
const findSingleSemesterRegistration = catchAsync(async (req, res) => {});

const updateSemesterRegistration = catchAsync(async (req, res) => {});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  findSemesterRegistration,
  findSingleSemesterRegistration,
  updateSemesterRegistration,
};
