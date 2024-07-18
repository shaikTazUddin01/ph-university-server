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
exports.AdminServices = void 0;
const admin_model_1 = __importDefault(require("./admin.model"));
const findAllAdminFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.find();
    return result;
});
const findSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.findById(id);
    return result;
});
const updateAdminInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteAdminIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    console.log(result);
    return result;
});
exports.AdminServices = {
    // createFacultyInToDB,
    findAllAdminFromDB,
    findSingleAdminFromDB,
    deleteAdminIntoDB,
    updateAdminInToDB,
};
