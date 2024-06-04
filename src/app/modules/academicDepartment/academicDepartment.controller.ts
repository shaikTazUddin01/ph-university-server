import { Request, Response } from "express";
import catchAsync from "../../utils/cathcAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const academicDepartment = req.body;
    // console.log("acadept--=>>",academicDepartment);
    const result =
      await AcademicDepartmentServices.CreateAcademicDepartmentInToDB(
        academicDepartment
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic Department create successFully",
      data: result,
    });
  }
);
const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.GetAcademicDepartmentFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic Department find successFully",
      data: result,
    });
  }
);
const getAcademicDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await AcademicDepartmentServices.GetAcademicDepartmentFromDBById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic Department find successFully",
      data: result,
    });
  }
);
const updateAcademicDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const academicDepartment = req.body;
    const result =
      await AcademicDepartmentServices.UPdateAcademicDepartmentFromDB(
        id,
        academicDepartment
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "academic Department updated successFully",
      data: result,
    });
  }
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartmentById,
};
