import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/cathcAsync";
import { AppError } from "../errors/AppErrors";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

// interface CustomRequest extends Request{
//   user:JwtPayload
// }

const auth = (...reqquiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized.!");
    }
    // console.log(token);

 
  
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    
// console.log(decoded);
    // const role = decoded.role;
    const { role, userId, iat } = decoded;
    // const id = decoded.userId;

    const user = await User.isUserExistsByCustomId(userId);
    // console.log(user);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
    }
    //checking is the user is already deleted
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is Deleted");
    }
    //checking is the user is already blocked
    const isStasus = user?.status;

    if (isStasus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is Blocked");
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    if (reqquiredRoles && !reqquiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
    }
    // const {userId,role}=decoded;
    req.user = decoded as JwtPayload & { role: string };
    // err
    // decoded undefined
    next();
    // invalid token

    // console.log(token);
  });
};

export default auth;
