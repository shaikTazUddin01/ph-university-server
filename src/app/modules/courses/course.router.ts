import express from "express";
import { courseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import courseValidation from "./course.validation";

const router = express.Router();

router.post(
  "",
  validateRequest(courseValidation),
  courseController.createCourse
);
router.get("/", courseController.findCourse);
router.get("/:id", courseController.findSingleCourse);
router.delete("/delete/:id", courseController.DeleteCourse);

export const course = router;
