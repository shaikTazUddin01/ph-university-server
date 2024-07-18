"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.course = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = __importStar(require("./course.validation"));
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("", (0, Auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(course_validation_1.default), course_controller_1.courseController.createCourse);
router.get("/", (0, Auth_1.default)('student', 'faculty', 'admin'), course_controller_1.courseController.findCourse);
router.get("/:id", (0, Auth_1.default)('student', 'faculty', 'admin'), course_controller_1.courseController.findSingleCourse);
router.delete("/:id", (0, Auth_1.default)('admin'), course_controller_1.courseController.DeleteCourse);
router.patch("/:id", (0, validateRequest_1.default)(course_validation_1.updatecourseValidation), course_controller_1.courseController.updateCourse);
router.put("/:courseId/assign-faculties", course_controller_1.courseController.assignFacultiesWithCourse);
router.delete("/:courseId/removed-faculties", course_controller_1.courseController.removedFacultiesWithCourse);
exports.course = router;
