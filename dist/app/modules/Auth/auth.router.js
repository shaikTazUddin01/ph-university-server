"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const user_constant_1 = require("../user/user.constant");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidetionSchema), auth_controller_1.AuthControllers.loginUser);
router.post("/change-passwod", (0, Auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.faculty), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.passwordValidetionSchema), auth_controller_1.AuthControllers.changePassword);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshtokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
router.post("/forget-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controller_1.AuthControllers.forgetPassword);
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.resetPasswordValidationSchema), auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoute = router;
