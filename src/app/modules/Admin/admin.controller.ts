import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";



const findAllAdmin=catchAsync(async(req,res)=>{
  const result =await AdminServices.findAllAdminFromDB()
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Successfully retrieve Admin data",
    data:result
  })
})
const findSingleAdmin=catchAsync(async(req,res)=>{
  const {id}=req.params
  // console.log(id);
  const result =await AdminServices.findSingleAdminFromDB(id)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Successfully retrieve faculty data",
    data:result
  })
})


const updateAdmin=catchAsync(async(req,res)=>{
  // console.log('update');
  const{id}=req.params
  const {adminInfo}=req.body
  const result= await AdminServices.updateAdminInToDB(id,adminInfo)

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Successfully update faculty data",
    data:result
  })
})


const deleteAdmin=catchAsync(async(req,res)=>{

  const{id}=req.params
// console.log(id);
  const result= await AdminServices.deleteAdminIntoDB(id)

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Successfully delete this admin",
    data:"deleted"
  })
})

export const adminController = {
 findAllAdmin,
 findSingleAdmin,
 deleteAdmin,
 updateAdmin
};
