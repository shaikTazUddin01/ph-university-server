"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import auth from '../../middlewares/auth';
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const enrolledCourse_controller_1 = require("./enrolledCourse.controller");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const enrolledCourse_validaton_1 = require("./enrolledCourse.validaton");
// import { EnrolledCourseValidations } from './enrolledCourse.validaton';
const router = express_1.default.Router();
router.post('/create-enrolled-course', (0, Auth_1.default)('student'), (0, validateRequest_1.default)(enrolledCourse_validaton_1.EnrolledCourseValidations.createEnrolledCourseValidationZodSchema), enrolledCourse_controller_1.EnrolledCourseControllers.createEnrolledCourse);
router.patch('/update-enrolled-course-marks', (0, Auth_1.default)('faculty'), (0, validateRequest_1.default)(enrolledCourse_validaton_1.EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema), enrolledCourse_controller_1.EnrolledCourseControllers.updateEnrolledCourseMarks);
exports.EnrolledCourseRoutes = router;
