import { Request, Response } from "express";
import { AcademicFacultyServices } from "./academicFaculty.service";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { academicFaculty } = req.body;
    console.log(academicFaculty);
    const result = await AcademicFacultyServices.CreateAcademicFacultyInToDB(
      academicFaculty
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic Faculty create successFully",
      data: result,
    });
  }
);
const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyServices.GetAcademicFacultyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "academic Faculty find successFully",
    data: result,
  });
});
const getAcademicFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyServices.GetAcademicFacultyFromDBById(
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic Faculty find successFully",
      data: result,
    });
  }
);
const updateAcademicFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { academicFaculty } = req.body;
    const result = await AcademicFacultyServices.UPdateAcademicFacultyFromDB(
      id,
      academicFaculty
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic Faculty find successFully",
      data: result,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFacultyById
};
