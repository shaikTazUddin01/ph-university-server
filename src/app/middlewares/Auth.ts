import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/cathcAsync";
import { AppError } from "../errors/AppErrors";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

// interface CustomRequest extends Request{
//   user:JwtPayload
// }

const auth = (...reqquiredRoles:TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized.!");
    }
    // invalid token
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
        }
        const role =(decoded as JwtPayload).role
        if (reqquiredRoles && !reqquiredRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
        }
        // const {userId,role}=decoded;
        req.user=decoded as JwtPayload
        // err
        // decoded undefined
      next();
      }
    );
    // console.log(token);
  });
};

export default auth;
