import express from "express";
import { userController } from "./user.controller";
// import { AnyZodObject } from "zod";

import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../student/student.zod.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentZodValidation),
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

export const userRouters = router;
