"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faculty = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
// router.post("/create-faculty", facultyController.createFaculty);
router.get("/", (0, Auth_1.default)(user_constant_1.USER_ROLE.admin), faculty_controller_1.facultyController.findAllFaculty);
router.get("/:id", faculty_controller_1.facultyController.findSingleFaculty);
router.patch("/update/:id", faculty_controller_1.facultyController.updateFaculty);
router.delete("/delete/:id", faculty_controller_1.facultyController.deleteFaculty);
exports.faculty = router;
