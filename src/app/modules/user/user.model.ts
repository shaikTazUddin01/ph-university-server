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
    },
    newPasswordChange: {
      type: Boolean,
      default: true,
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
  return await User.findOne({ id });
};
//checked password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  // console.log(plainTextPassword, hashedPassword);
  return await bcrypt.compare(plainTextPassword,hashedPassword)
};
export const User = model<Tuser, UserModel>("User", userSchema);
