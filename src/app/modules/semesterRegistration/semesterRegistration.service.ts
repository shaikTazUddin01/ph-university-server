import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistration from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { CurrencyCodes } from "validator/lib/isISO4217";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationInToDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semesterr that is already 'UPCOMMING' or "ONGING"

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester`
    );
  }

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
  const result = await semesterRegistrationQuery.modelQuery;
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
  //check if the semester exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  // console.log(isAcademicSemesterExsts);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "this semester is not found !");
  }

  //if the requested semester registation is ended , we will not update anything

  const crrentSemesterStatus = isSemesterRegistrationExists?.status;

  const requestedStatus = payload?.status;

  if (crrentSemesterStatus == RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "this academic semester is ended!"
    );
  }

  if (crrentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `you can not directly change status from ${crrentSemesterStatus} to ${requestedStatus}`
    );
  }
  if (crrentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `you can not directly change status from ${crrentSemesterStatus} to ${requestedStatus}`
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationInToDB,
  findAllSemesterRegistrationFromDB,
  findSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInToDB,
};
