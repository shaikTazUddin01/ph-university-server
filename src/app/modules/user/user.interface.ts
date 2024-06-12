import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface Tuser {
  id: string;
  password: string;
  newPasswordChange?: boolean;
  role: "student" | "admin" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<Tuser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string): Promise<Tuser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
// export type NewUser={
//   password:string;
//   role:string;
//   id:string
// }

export type TUserRole= keyof typeof USER_ROLE;