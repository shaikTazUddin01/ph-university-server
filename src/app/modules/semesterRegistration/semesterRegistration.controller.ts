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

const findSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.findAllSemesterRegistrationFromDB(
      req.query
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "semester register is retrieve successfully",
    data: result,
  });
});
const findSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result =
    await SemesterRegistrationServices.findSingleSemesterRegistrationFromDB(
      id
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "semester register is retrieve successfully",
    data: result,
  });
  // console.log('this is taz');
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const {id}=req.params;

  const result = await SemesterRegistrationServices.updateSemesterRegistrationInToDB(id,req.body)
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "semester register updated successfully",
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  findSemesterRegistration,
  findSingleSemesterRegistration,
  updateSemesterRegistration,
};
