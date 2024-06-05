import express from "express";
import { facultyController } from "./faculty.controller";

const router = express.Router();

router.post("/create-faculty", facultyController.createFaculty);

export const faculty = router;
