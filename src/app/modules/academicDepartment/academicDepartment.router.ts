import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-Department",
  // validateRequest(
  //   AcademicDepartmentValidation.CreateAcademicDepartmentValidation
  // ),
  academicDepartmentController.createAcademicDepartment
);
router.get("/", academicDepartmentController.getAcademicDepartment);
router.get("/:id", academicDepartmentController.getAcademicDepartmentById);
router.patch(
  "/academic-Department/:id",
  validateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentValidation
  ),
  academicDepartmentController.updateAcademicDepartmentById
);

export const academicDepartment = router;
