"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFaculty = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculy_validation_1 = require("./academicFaculy.validation");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const router = express_1.default.Router();
router.post("/create-faculty", (0, validateRequest_1.default)(academicFaculy_validation_1.AcademicFacultyValidation.CreateAcademicFacultyValidation), academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get("/academic-faculty", (0, Auth_1.default)(), academicFaculty_controller_1.academicFacultyController.getAcademicFaculty);
router.get("/academic-faculty/:id", academicFaculty_controller_1.academicFacultyController.getAcademicFacultyById);
router.patch("/academic-faculty/:id", academicFaculty_controller_1.academicFacultyController.updateAcademicFacultyById);
exports.academicFaculty = router;
