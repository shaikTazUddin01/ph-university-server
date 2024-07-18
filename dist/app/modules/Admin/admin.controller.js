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
exports.adminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cathcAsync_1 = __importDefault(require("../../utils/cathcAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const findAllAdmin = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.findAllAdminFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully retrieve Admin data",
        data: result
    });
}));
const findSingleAdmin = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(id);
    const result = yield admin_service_1.AdminServices.findSingleAdminFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully retrieve faculty data",
        data: result
    });
}));
const updateAdmin = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('update');
    const { id } = req.params;
    const { adminInfo } = req.body;
    const result = yield admin_service_1.AdminServices.updateAdminInToDB(id, adminInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully update faculty data",
        data: result
    });
}));
const deleteAdmin = (0, cathcAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(id);
    const result = yield admin_service_1.AdminServices.deleteAdminIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully delete this admin",
        data: "deleted"
    });
}));
exports.adminController = {
    findAllAdmin,
    findSingleAdmin,
    deleteAdmin,
    updateAdmin
};
