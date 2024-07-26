import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TacademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterInToDB = async (data: TacademicSemester) => {
  if (academicSemesterNameCodeMapper[data.name] !== data.code) {
    throw new Error("Invalid Semester code");
  }
  // console.log("data-->>",data);
  const result = await AcademicSemesterModel.create(data);
  return result;
};

const findAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find();

  return result;
};
const findAcademicSemesterFromDBById = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateAcademicSemesterFromDBById = async (
  id: string,
  data: Partial<TacademicSemester>
) => {
  if (academicSemesterNameCodeMapper[data?.name as string] !== data?.code) {
    throw new Error("Invalid Semester code");
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(id, data, {
    returnOriginal: false,
  });
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterInToDB,
  findAcademicSemesterFromDB,
  findAcademicSemesterFromDBById,
  updateAcademicSemesterFromDBById,
};
