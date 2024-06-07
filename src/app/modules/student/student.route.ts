import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.zod.validation";

const router = express.Router();

// router.post('/create-student', StudentControllers.crateStudent);

router.get("/", StudentControllers.getAllStudent);

router.get("/:id", StudentControllers.getSingleStudent);
router.delete("/:id", StudentControllers.deleteStudent);

router.patch(
  "/:id",
  validateRequest(studentValidations.updateStudentZodValidation),
  StudentControllers.updateStudent
);

export const StudentRoutes = router;
