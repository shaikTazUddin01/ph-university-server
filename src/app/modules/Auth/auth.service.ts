import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from "../../config";

const logInUser = async (payload: TLoginUser) => {
  //checking if hte user is exist
  // const isUserExists =
  // console.log(isUserExists);
  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }
  //   //checking is the user is already deleted
  const isDeleted = user?.isDeleted;
  // console.log(isDeleted);

  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is Deleted");
  }
  //checking is the user is already blocked
  const isStasus = user?.status;

  if (isStasus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is Blocked");
  }

  //checking if the password is correct

  const passwordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );

  // const passwordMatched=await bcrypt.compare(payload?.password,user?.password)

  // console.log(passwordMatched);

  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "password is not matched");
  }
  //create token and sent to the client

  const jwtPayload = {
    uesrId: user,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });
  // console.log("mathced");
  // console.log(isPasswordMatched);
  return {
    accessToken,
    needsPasswordChange: user?.newPasswordChange,
  };
};

export const AuthServices = {
  logInUser,
};
