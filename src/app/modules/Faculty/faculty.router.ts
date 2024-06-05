import express from "express";
import { facultyController } from "./faculty.controller";

const router = express.Router();


// router.post("/create-faculty", facultyController.createFaculty);
router.get("/", facultyController.findAllFaculty);
router.get("/:id", facultyController.findSingleFaculty);
router.patch("/update/:id", facultyController.updateFaculty);
router.delete("/delete/:id", facultyController.deleteFaculty);
export const faculty = router;
