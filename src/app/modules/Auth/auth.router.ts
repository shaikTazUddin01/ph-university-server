import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/Auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidetionSchema),
  AuthControllers.loginUser
);
router.post(
  "/change-passwod",
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  validateRequest(AuthValidation.passwordValidetionSchema),
  AuthControllers.changePassword
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshtokenValidationSchema),
  AuthControllers.refreshToken
);
router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);

export const AuthRoute = router;
