import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface Tuser {
  id: string;
  password: string;
  newPasswordChange?: boolean;
  role: "student" | "admin" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  passwordChangeAt?: Date;
}

export interface UserModel extends Model<Tuser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string): Promise<Tuser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
