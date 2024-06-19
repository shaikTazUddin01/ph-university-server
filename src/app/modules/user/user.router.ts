import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
// import { AnyZodObject } from "zod";

import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../student/student.zod.validation";
import auth from "../../middlewares/Auth";
import { useValidation } from "./user.validation";
import { USER_ROLE } from "./user.constant";
import { upload } from "../../utils/sendImageToClodinary";
// import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  upload.single("file"),
  // auth(USER_ROLE.admin ),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentZodValidation),
  userController.createStudent
);
router.post("/create-faculty", userController.createFaculty);
router.post("/create-admin", userController.createAdmin);

router.post(
  "/change-status/:id",
  // auth('admin'),
  validateRequest(useValidation.changeStatusValidationSchema),
  auth(USER_ROLE.admin),
  userController.changeStatus
);

router.get("/me", auth("student", "admin", "faculty"), userController.getMe);
export const userRouters = router;
