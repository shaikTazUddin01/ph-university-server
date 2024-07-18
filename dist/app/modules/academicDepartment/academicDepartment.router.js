"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartment = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post("/create-Department", 
// validateRequest(
//   AcademicDepartmentValidation.CreateAcademicDepartmentValidation
// ),
academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get("/", academicDepartment_controller_1.academicDepartmentController.getAcademicDepartment);
router.get("/:id", academicDepartment_controller_1.academicDepartmentController.getAcademicDepartmentById);
router.patch("/academic-Department/:id", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.UpdateAcademicDepartmentValidation), academicDepartment_controller_1.academicDepartmentController.updateAcademicDepartmentById);
exports.academicDepartment = router;
