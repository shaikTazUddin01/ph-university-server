"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = require("../errors/handleZodError");
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
// import { handleCastError } from "../errors/handleCastError";
// import app from "../app";
const globalErrorHandler = (err, req, res, next) => {
    //setting default value
    let statusCode = err.statusCode || 500;
    let message = err.message || "something went wrong.!";
    let errorSources = [
        {
            path: "",
            message: "Something is wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplefieldError = (0, handleZodError_1.handleZodError)(err);
        message = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.message;
        statusCode = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.statusCode;
        errorSources = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.errorSources;
        // console.log(simplefieldError);
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplefieldError = (0, handleValidationError_1.default)(err);
        message = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.message;
        statusCode = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.statusCode;
        errorSources = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplefieldError = (0, handleCastError_1.default)(err);
        message = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.message;
        statusCode = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.statusCode;
        errorSources = simplefieldError === null || simplefieldError === void 0 ? void 0 : simplefieldError.errorSources;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
