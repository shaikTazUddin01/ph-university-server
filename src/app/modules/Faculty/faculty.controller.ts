import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.service";

// const createFaculty = catchAsync(async (req, res) => {
//   const result = await facultyServices.createFacultyInToDB(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Faculty is creates successfully",
//     data: result,
//   });
// });

const findAllFaculty=catchAsync(async(req,res)=>{
  const result =await facultyServices.findAllFacultyFromDB()
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Successfully retrieve faculty data",
    data:result
  })
})
const findSingleFaculty=catchAsync(async(req,res)=>{
  const {id}=req.params
  console.log(id);
  const result =await facultyServices.findSingleFacultyFromDB(id)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Successfully retrieve faculty data",
    data:result
  })
})

export const facultyController = {
  // createFaculty,
  findAllFaculty,
  findSingleFaculty
};
