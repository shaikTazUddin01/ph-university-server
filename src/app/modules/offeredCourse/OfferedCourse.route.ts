import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseControllers } from "./OfferedCourse.controller";
import { OfferedCourseValidations } from "./OfferedCourse.validation";

const router = express.Router();

router.get("/", OfferedCourseControllers.getOfferedCourse);
router.get("/:id", OfferedCourseControllers.getsingleOfferedCourse);
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
