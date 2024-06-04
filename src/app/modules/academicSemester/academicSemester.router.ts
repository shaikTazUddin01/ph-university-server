import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidation.CreateAcademicSemesterValidation),
  academicSemesterController.createAcademicSemester
);
router.get(
  "/academic-semester",
  academicSemesterController.findAcademicSemester
);
router.get(
  "/academic-semester/:id",
  academicSemesterController.findAcademicSemesterById
);
router.patch(
  "/update-academic-semester/:id",
  academicSemesterController.updateAcademicSemesterById
);

export const AcademicSemesterRoutes = router;
