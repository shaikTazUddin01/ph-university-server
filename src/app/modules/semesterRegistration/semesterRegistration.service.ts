import httpStatus from "http-status"
import { AppError } from "../../errors/AppErrors"
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import SemesterRegistration from "./semesterRegistration.model"



const createSemesterRegistrationInToDB=async(payload: TSemesterRegistration)=>{

    const academicSemester=payload?.academicSemester

    const isSemesterregistrationExists= await SemesterRegistration.findOne({academicSemester})

    if(academicSemester){
        throw new AppError(httpStatus.CONFLICT,'this academic semester is already register!')
    }

    
    //check if the semester exist
    const isAcademicSemesterExsts =await AcademicSemesterModel.findById(academicSemester)
    if(!isAcademicSemesterExsts){
        throw new AppError(httpStatus.NOT_FOUND,'this academic semester is not found !')
    }

  const result= await SemesterRegistration.create()
  return result
}
const findAllSemesterRegistrationFromDB=async()=>{

  const result= await SemesterRegistration.find()
  return result
}

const findSingleSemesterRegistrationFromDB=async(id : string)=>{

  const result= await SemesterRegistration.findById(id)
  return result
}
const updateSemesterRegistrationInToDB=async(id : string,payload :Partial<TSemesterRegistration>)=>{

  const result= await SemesterRegistration.findByIdAndUpdate()

  return result
}


export const SemesterRegistrationServices = {
  createSemesterRegistrationInToDB,
  findAllSemesterRegistrationFromDB,
  findSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInToDB,
  
};
