import { TacademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterInToDB = async (data : TacademicSemester) => {
 const result = await AcademicSemesterModel.create(data)
 return result
};

export const academicSemesterService = {
  createAcademicSemesterInToDB,
};
