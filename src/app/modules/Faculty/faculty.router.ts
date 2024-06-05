import express from "express";
import { facultyController } from "./faculty.controller";

const router = express.Router();


// router.post("/create-faculty", facultyController.createFaculty);
router.get("/", facultyController.findAllFaculty);
router.get("/:id", facultyController.findSingleFaculty);
export const faculty = router;
