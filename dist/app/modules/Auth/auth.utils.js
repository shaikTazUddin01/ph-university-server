"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deCodedToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (jwtpayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtpayload, secret, {
        expiresIn: expiresIn,
    });
};
exports.createToken = createToken;
const deCodedToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.deCodedToken = deCodedToken;
