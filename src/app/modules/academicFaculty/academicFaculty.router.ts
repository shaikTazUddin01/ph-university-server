import express from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculy.validation";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.CreateAcademicFacultyValidation),
  academicFacultyController.createAcademicFaculty
);
router.get("/academic-faculty", academicFacultyController.getAcademicFaculty);
router.get(
  "/academic-faculty/:id",
  academicFacultyController.getAcademicFacultyById
);
router.patch(
  "/academic-faculty/:id",
  academicFacultyController.updateAcademicFacultyById
);

export const academicFaculty = router;
