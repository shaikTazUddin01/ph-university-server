"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_zod_validation_1 = require("./student.zod.validation");
const router = express_1.default.Router();
// router.post('/create-student', StudentControllers.crateStudent);
router.get("/", student_controller_1.StudentControllers.getAllStudent);
router.get("/:id", student_controller_1.StudentControllers.getSingleStudent);
router.delete("/:id", student_controller_1.StudentControllers.deleteStudent);
router.patch("/:id", (0, validateRequest_1.default)(student_zod_validation_1.studentValidations.updateStudentZodValidation), student_controller_1.StudentControllers.updateStudent);
exports.StudentRoutes = router;
