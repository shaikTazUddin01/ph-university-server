import express from "express";
import { adminController } from "./admin.controller";


const router = express.Router();


// router.post("/create-faculty", facultyController.createFaculty);
router.get("/",adminController.findAllAdmin);
router.get("/:id",adminController.findSingleAdmin);
router.patch("/:id",adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);
export const adminRoute = router;
