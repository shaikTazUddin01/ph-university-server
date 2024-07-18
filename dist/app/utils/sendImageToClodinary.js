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
exports.upload = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const multer_1 = __importDefault(require("multer"));
// import config from "../config";
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret, // Click 'View Credentials' below to copy your API secret
});
const sendImageToCloudinary = (path, name) => __awaiter(void 0, void 0, void 0, function* () {
    // Configuration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const uploadResult = yield cloudinary_1.v2.uploader
        .upload(path, {
        public_id: name,
    })
        .catch((error) => {
        console.log(error);
    });
    fs_1.default.unlink(path, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("file is deleted");
        }
    });
    return uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
});
exports.sendImageToCloudinary = sendImageToCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
