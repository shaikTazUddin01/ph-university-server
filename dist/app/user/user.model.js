"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    password: {
        type: String,
    },
    newPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: {
            values: ["student", "admin", "faculty"],
            message: "{VALUE} is not supported",
        },
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
//pre middleware
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'pre student data');
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_round));
        next();
    });
});
//set ' ' after savig password
userSchema.post("save", function (doc, next) {
    doc.password = "";
    // console.log(this, 'this is post middleware');
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
