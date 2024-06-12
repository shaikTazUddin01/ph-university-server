import { Schema, model } from "mongoose";
import { Tuser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
const userSchema = new Schema<Tuser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: 0,
      required: true,
    },
    newPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: {
        values: ["student", "admin", "faculty"],
        message: "{VALUE} is not supported",
      },
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//pre middleware
userSchema.pre("save", async function (next) {
  // console.log(this, 'pre student data');
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});

//set ' ' after savig password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  // console.log(this, 'this is post middleware');
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};
//checked password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  // console.log(plainTextPassword, hashedPassword);
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
// userSchema.statics.isJWTIssuedBeforePasswordChanged =function( passwordChangedTimeStap: Date,
//   jwtIssuesTimestamp: number){


//     return passwordChangedTimeStap>jwtIssuesTimestamp
//   }

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  // console.log(passwordChangedTimestamp,
  //   jwtIssuedTimestamp);
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};
export const User = model<Tuser, UserModel>("User", userSchema);
