import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import auth from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  // auth(USER_ROLE.admin),
  validateRequest(AcademicSemesterValidation.CreateAcademicSemesterValidation),
  academicSemesterController.createAcademicSemester
);
router.get(
  "/",auth(USER_ROLE.admin),
  academicSemesterController.findAcademicSemester
);
router.get(
  "/:id",auth(USER_ROLE.admin),
  academicSemesterController.findAcademicSemesterById
);
router.patch(
  "/:id",
  academicSemesterController.updateAcademicSemesterById
);

export const AcademicSemesterRoutes = router;
