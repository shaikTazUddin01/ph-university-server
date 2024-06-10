import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  validateSemesterRegistrations,
} from "./semesterRegistration.validation";
import { SemesterRegistrationController } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    validateSemesterRegistrations.createSemesterRegistrationValidationSchmea
  ),
  SemesterRegistrationController.createSemesterRegistration
);

router.get("/", SemesterRegistrationController.findSemesterRegistration);
router.get(
  "/:id",
  SemesterRegistrationController.findSingleSemesterRegistration
);
router.patch(
  "/:id",
  validateRequest(
    validateSemesterRegistrations.updateSemesterRegistrationValidationSchmea
  ),
  SemesterRegistrationController.updateSemesterRegistration
);

export const SemesterRegistration = router;
