"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../../errors/AppErrors");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// import { string } from "zod";
const auth_utils_1 = require("./auth.utils");
const sendEmail_1 = require("../../utils/sendEmail");
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if hte user is exist
    const user = yield user_model_1.User.isUserExistsByCustomId(payload.id);
    // console.log(user);
    if (!user) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This user is not found");
    }
    //checking is the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This user is Deleted");
    }
    //checking is the user is already blocked
    const isStasus = user === null || user === void 0 ? void 0 : user.status;
    if (isStasus === "blocked") {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is Blocked");
    }
    //checking if the password is correct
    const passwordMatched = yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    // console.log(passwordMatched);
    if (!passwordMatched) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "password is not matched");
    }
    //create token and sent to the client
    // console.log( "user Id",user?.id);
    // const jwtPayload = {
    //   userId: user?.id,
    //   Id: user?.id,
    //   role: user?.role,
    // };
    const jwtpayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // console.log(jwtpayload);
    const accessToken = (0, auth_utils_1.createToken)(jwtpayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtpayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.newPasswordChange,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(userData);
    const user = yield user_model_1.User.isUserExistsByCustomId(userData.userId);
    // console.log(user);
    if (!user) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This user is not found");
    }
    //checking is the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This user is Deleted");
    }
    //checking is the user is already blocked
    const isStasus = user === null || user === void 0 ? void 0 : user.status;
    if (isStasus === "blocked") {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is Blocked");
    }
    //checking if the password is correct
    // const passwordMatched = await User.isPasswordMatched(
    //   payload?.password,
    //   user?.password
    // );
    if (!(yield user_model_1.User.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "Password do not matched");
    // console.log(passwordMatched);
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashedPassword,
        newPasswordChange: false,
        passwordChangeAt: new Date(),
    });
    return null;
});
//refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByCustomId(userId);
    if (!user) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    if (user.passwordChangeAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat)) {
        throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgetPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByCustomId(userId);
    if (!user) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, "10m");
    const resetUILink = `${config_1.default.reset_pass_ui_link}?id=${user === null || user === void 0 ? void 0 : user.id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, resetUILink);
    // console.log(resetUILink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    if ((decoded === null || decoded === void 0 ? void 0 : decoded.userId) !== (payload === null || payload === void 0 ? void 0 : payload.id)) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "you are forbidden");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.findOneAndUpdate({
        id: payload.id,
        role: user.role,
    }, {
        password: newHashedPassword,
        newPasswordChange: false,
        passwordChangeAt: new Date(),
    }, {
        new: true,
    });
    console.log(newHashedPassword);
    return result;
});
exports.AuthServices = {
    logInUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
