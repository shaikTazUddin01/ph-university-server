import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistration from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistrationInToDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //check if the semester exist
  const isAcademicSemesterExsts = await AcademicSemesterModel.findById(
    academicSemester
  );
  // console.log(isAcademicSemesterExsts);
  if (!isAcademicSemesterExsts) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "this academic semester is not found !"
    );
  }

  //check is already register or not
  const isSemesterregistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterregistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "this academic semester is already register!"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};
const findAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery
  return result;
};

const findSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationInToDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const result = await SemesterRegistration.findByIdAndUpdate(id,payload);

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationInToDB,
  findAllSemesterRegistrationFromDB,
  findSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInToDB,
};
