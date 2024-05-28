"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_route_1 = require("./student/student.route");
const cors_1 = __importDefault(require("cors"));
const user_router_1 = require("./user/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use("/api/v1/students", student_route_1.StudentRoutes);
app.use("/api/v1/users", user_router_1.userRouters);
app.use("", (req, res) => {
    res.send("server is connceting");
});
app.use((err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || "something went wrong.!";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
});
exports.default = app;
