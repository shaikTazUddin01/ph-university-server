import express from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculy.validation";
import auth from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.CreateAcademicFacultyValidation),
  academicFacultyController.createAcademicFaculty
);
router.get("/academic-faculty",auth(USER_ROLE.admin), academicFacultyController.getAcademicFaculty);
router.get(
  "/academic-faculty/:id",
  academicFacultyController.getAcademicFacultyById
);
router.patch(
  "/academic-faculty/:id",
  academicFacultyController.updateAcademicFacultyById
);

export const academicFaculty = router;
