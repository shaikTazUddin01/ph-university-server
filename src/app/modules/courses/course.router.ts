import express from "express";
import { courseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import courseValidation, { updatecourseValidation } from "./course.validation";
import auth from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "",auth(USER_ROLE.admin),
  validateRequest(courseValidation),
  courseController.createCourse
);
router.get("/",auth('student','faculty','admin'), courseController.findCourse);
router.get("/:id",auth('student','faculty','admin'), courseController.findSingleCourse);
router.delete("/:id",auth('admin'), courseController.DeleteCourse);
router.patch(
  "/:id",
  validateRequest(updatecourseValidation),
  courseController.updateCourse
);
router.put("/:courseId/assign-faculties", courseController.assignFacultiesWithCourse);

router.delete("/:courseId/removed-faculties", courseController.removedFacultiesWithCourse);

export const course = router;
