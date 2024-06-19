/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface Tuser {
  id: string;
  password: string;
  email: string;
  newPasswordChange?: boolean;
  role: "student" | "admin" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  
  passwordChangeAt?: Date;
}

export interface UserModel extends Model<Tuser> {
  // myStaticMethod(): number;
  // eslint-disable-next-line no-unused-vars
  isUserExistsByCustomId(id: string): Promise<Tuser>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
