import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseControllers } from "./OfferedCourse.controller";
import { OfferedCourseValidations } from "./OfferedCourse.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/Auth";

const router = express.Router();

router.get("/", OfferedCourseControllers.getOfferedCourse);
// router.get("/:id", OfferedCourseControllers.getsingleOfferedCourse);
router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  OfferedCourseControllers.getMyOfferedCourses,
);
router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);
// router.post(
//   "/create-offered-course",
//   validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
//   OfferedCourseControllers.createOfferedCourse
// );
router.patch(
  "/update-offered-course/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

export const offeredCourseRoutes = router;
