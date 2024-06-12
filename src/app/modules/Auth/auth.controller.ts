import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { ParseStatus } from "zod";


const loginUser=catchAsync(async(req,res)=>{
const result = await AuthServices.logInUser(req.body)
// console.log(result);
sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login SuccessFully",
    data: result,
  });
})
const changePassword=catchAsync(async(req,res)=>{
// console.log(req.user,req.body);
// const user= req.user;
const{...passwordData}=req.body
const result = await AuthServices.changePassword(req.user,passwordData)
// console.log(result);
sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "password change SuccessFully",
    data: result,
  });
})

export const AuthControllers={
    loginUser,
    changePassword
}