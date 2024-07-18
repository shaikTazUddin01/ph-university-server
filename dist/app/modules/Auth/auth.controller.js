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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
// import { ParseStatus } from "zod";
const config_1 = __importDefault(require("../../config"));
const loginUser = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.logInUser(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === "production",
        httpOnly: true
    });
    // console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User login SuccessFully",
        data: {
            accessToken,
            needsPasswordChange
        },
    });
}));
const changePassword = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user,req.body);
    // const user= req.user;
    const passwordData = __rest(req.body, []);
    const result = yield auth_service_1.AuthServices.changePassword(req.user, passwordData);
    // console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "password change SuccessFully",
        data: result,
    });
}));
const refreshToken = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
}));
const forgetPassword = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.body;
    const result = yield auth_service_1.AuthServices.forgetPassword(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'reset link is genarated successfully!',
        data: result,
    });
}));
const resetPassword = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    // console.log(token);
    const result = yield auth_service_1.AuthServices.resetPassword(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'password reset successfully!',
        data: result,
    });
}));
exports.AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
};
