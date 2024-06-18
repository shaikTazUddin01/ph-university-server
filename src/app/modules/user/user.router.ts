import express from "express";
import { userController } from "./user.controller";
// import { AnyZodObject } from "zod";

import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../student/student.zod.validation";
import auth from "../../middlewares/Auth";
import { useValidation } from "./user.validation";
import { USER_ROLE } from "./user.constant";
// import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentZodValidation),
  // auth(USER_ROLE.admin ),
  userController.createStudent
);
router.post(
  "/create-faculty",
  userController.createFaculty
);
router.post(
  "/create-admin",
  userController.createAdmin
);

router.post(
  "/change-status/:id",
  // auth('admin'),
  validateRequest(useValidation.changeStatusValidationSchema),
  auth(USER_ROLE.admin ),
  userController.changeStatus
);

router.get(
  "/me",auth('student','admin','faculty' ),
  userController.getMe
);
export const userRouters = router;
