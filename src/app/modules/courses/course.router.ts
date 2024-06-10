import express from "express";
import { courseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import courseValidation, { updatecourseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "",
  validateRequest(courseValidation),
  courseController.createCourse
);
router.get("/", courseController.findCourse);
router.get("/:id", courseController.findSingleCourse);
router.delete("/:id", courseController.DeleteCourse);
router.patch(
  "/:id",
  validateRequest(updatecourseValidation),
  courseController.updateCourse
);
router.put("/:courseId/assign-faculties", courseController.assignFacultiesWithCourse);

router.delete("/:courseId/removed-faculties", courseController.removedFacultiesWithCourse);

export const course = router;
