import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const CreateAcademicDepartmentInToDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const GetAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const GetAcademicDepartmentFromDBById = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const UPdateAcademicDepartmentFromDB = async (
  id: string,
  payload: TAcademicDepartment
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  CreateAcademicDepartmentInToDB,
  GetAcademicDepartmentFromDB,
  GetAcademicDepartmentFromDBById,
  UPdateAcademicDepartmentFromDB,
};
