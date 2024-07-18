"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
            // console.log(stack);
        }
        else {
            Error.captureStackTrace(this, this.constructor);
            // console.log(this,this.constructor);
        }
    }
}
exports.AppError = AppError;
