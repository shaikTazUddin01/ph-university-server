import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'

const logInUser = async (payload: TLoginUser) => {
  //checking if hte user is exist
  const isUserExists = await User.findOne({ id: payload?.id });
  // console.log(isUserExists);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }
  //checking is the user is already deleted
  const isDeleted = isUserExists?.isDeleted;
  // console.log(isDeleted);

  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is Deleted");
  }
  //checking is the user is already blocked
  const isStasus = isUserExists?.status;

  if (isStasus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is Blocked");
  }
//checking if the password is correct
const isPasswordMatched =await bcrypt.compare(payload?.password,isUserExists?.password)

console.log(isPasswordMatched);
  return;
};

export const AuthServices = {
  logInUser,
};
