"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.CreateAcademicSemesterValidation), academicSemester_controller_1.academicSemesterController.createAcademicSemester);
router.get("/", (0, Auth_1.default)(user_constant_1.USER_ROLE.admin), academicSemester_controller_1.academicSemesterController.findAcademicSemester);
router.get("/:id", (0, Auth_1.default)(user_constant_1.USER_ROLE.admin), academicSemester_controller_1.academicSemesterController.findAcademicSemesterById);
router.patch("/:id", academicSemester_controller_1.academicSemesterController.updateAcademicSemesterById);
exports.AcademicSemesterRoutes = router;
