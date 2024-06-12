import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


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

export const AuthControllers={
    loginUser
}