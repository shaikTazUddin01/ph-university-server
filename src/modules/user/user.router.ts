import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { AnyZodObject } from "zod";

import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../student/student.zod.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentZodValidation),
  userController.createStudent
);

export const userRouters = router;
