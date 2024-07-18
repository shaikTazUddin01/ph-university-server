import express from "express";
import { facultyController } from "./faculty.controller";
import auth from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();


// router.post("/create-faculty", facultyController.createFaculty);
router.get("/",auth(USER_ROLE.admin), facultyController.findAllFaculty);
router.get("/:id", facultyController.findSingleFaculty);
router.patch("/update/:id", facultyController.updateFaculty);
router.delete("/delete/:id", facultyController.deleteFaculty);
export const faculty = router;
