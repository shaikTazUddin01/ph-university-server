import { TAcademicFaculty } from "./academicFaculty.inerface";
import { AcademicFaculty } from "./acdemicFaculty.model";

const CreateAcademicFacultyInToDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const GetAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const GetAcademicFacultyFromDBById = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const UPdateAcademicFacultyFromDB = async (
  id: string,
  payload: TAcademicFaculty
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload,{
    returnOriginal: false,
  });
  return result;
};

export const AcademicFacultyServices = {
  CreateAcademicFacultyInToDB,
  GetAcademicFacultyFromDB,
  GetAcademicFacultyFromDBById,
  UPdateAcademicFacultyFromDB,
};
