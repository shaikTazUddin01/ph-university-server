import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
// import { ParseStatus } from "zod";
import config from "../../config";


const loginUser=catchAsync(async(req,res)=>{
const result = await AuthServices.logInUser(req.body)
const {refreshToken,accessToken,needsPasswordChange}=result

res.cookie('refreshToken',refreshToken,{
  secure:config.node_env==="production",
  httpOnly:true
})
// console.log(result);
sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login SuccessFully",
    data: {
      accessToken,
      needsPasswordChange
    },
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


const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword=catchAsync(async (req, res) => {
  const { id :userId } = req.body;
  const result = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reset link is genarated successfully!',
    data: result,
  });
});
const resetPassword=catchAsync(async (req, res) => {
const token=req.headers.authorization
// console.log(token);
  const result = await AuthServices.resetPassword(req.body,token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password reset successfully!',
    data: result,
  });
});

export const AuthControllers={
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}