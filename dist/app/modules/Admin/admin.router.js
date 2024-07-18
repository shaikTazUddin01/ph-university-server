"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
// router.post("/create-faculty", facultyController.createFaculty);
router.get("/", admin_controller_1.adminController.findAllAdmin);
router.get("/:id", admin_controller_1.adminController.findSingleAdmin);
router.patch("/:id", admin_controller_1.adminController.updateAdmin);
router.delete("/:id", admin_controller_1.adminController.deleteAdmin);
exports.adminRoute = router;
