"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
// import { AnyZodObject } from "zod";
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_zod_validation_1 = require("../student/student.zod.validation");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const user_validation_1 = require("./user.validation");
const user_constant_1 = require("./user.constant");
const sendImageToClodinary_1 = require("../../utils/sendImageToClodinary");
// import { USER_ROLE } from "./user.constant";
const router = express_1.default.Router();
router.post("/create-student", sendImageToClodinary_1.upload.single("file"), 
// auth(USER_ROLE.admin ),
(req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(student_zod_validation_1.studentValidations.createStudentZodValidation), user_controller_1.userController.createStudent);
router.post("/create-faculty", user_controller_1.userController.createFaculty);
router.post("/create-admin", user_controller_1.userController.createAdmin);
router.post("/change-status/:id", 
// auth('admin'),
(0, validateRequest_1.default)(user_validation_1.useValidation.changeStatusValidationSchema), (0, Auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userController.changeStatus);
router.get("/me", (0, Auth_1.default)("student", "admin", "faculty"), user_controller_1.userController.getMe);
exports.userRouters = router;
