import express from "express";
import { userController } from "./user.controller";
// import { AnyZodObject } from "zod";

import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../student/student.zod.validation";
import auth from "../../middlewares/Auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentZodValidation),auth(USER_ROLE.admin ),
  userController.createStudent
);
router.post(
  "/create-faculty",
  userController.createFaculty
);
router.post(
  "/create-admin",auth(USER_ROLE.admin),
  userController.createAdmin
);

export const userRouters = router;
