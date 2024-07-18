"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATAbasE_URL,
    // salt_round: process.env.SLAT_ROUND,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    default_pass: process.env.DEFAULT_PASS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESS_EXPIRES_IN,
    send_email_pass: process.env.SEND_EMAIL_PASS,
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
};
