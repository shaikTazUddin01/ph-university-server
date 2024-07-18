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
exports.SemesterRegistrationServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../../errors/AppErrors");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_model_1 = __importDefault(require("./semesterRegistration.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const createSemesterRegistrationInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    //check if there any registered semesterr that is already 'UPCOMMING' or "ONGING"
    const isThereAnyUpcomingOrOngoingSemester = yield semesterRegistration_model_1.default.findOne({
        $or: [
            { status: semesterRegistration_constant_1.RegistrationStatus.UPCOMING },
            { status: semesterRegistration_constant_1.RegistrationStatus.ONGOING },
        ],
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester`);
    }
    //check if the semester exist
    const isAcademicSemesterExsts = yield academicSemester_model_1.AcademicSemesterModel.findById(academicSemester);
    // console.log(isAcademicSemesterExsts);
    if (!isAcademicSemesterExsts) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "this academic semester is not found !");
    }
    //check is already register or not
    const isSemesterregistrationExists = yield semesterRegistration_model_1.default.findOne({
        academicSemester,
    });
    if (isSemesterregistrationExists) {
        throw new AppErrors_1.AppError(http_status_1.default.CONFLICT, "this academic semester is already register!");
    }
    const result = yield semesterRegistration_model_1.default.create(payload);
    return result;
});
const findAllSemesterRegistrationFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.default.find().populate("academicSemester"), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semesterRegistrationQuery.modelQuery;
    return result;
});
const findSingleSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.default.findById(id);
    return result;
});
const updateSemesterRegistrationInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check if the semester exist
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.default.findById(id);
    // console.log(isAcademicSemesterExsts);
    if (!isSemesterRegistrationExists) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "this semester is not found !");
    }
    //if the requested semester registation is ended , we will not update anything
    const crrentSemesterStatus = isSemesterRegistrationExists === null || isSemesterRegistrationExists === void 0 ? void 0 : isSemesterRegistrationExists.status;
    const requestedStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (crrentSemesterStatus == semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "this academic semester is ended!");
    }
    if (crrentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING && requestedStatus === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, `you can not directly change status from ${crrentSemesterStatus} to ${requestedStatus}`);
    }
    if (crrentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ONGOING && requestedStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, `you can not directly change status from ${crrentSemesterStatus} to ${requestedStatus}`);
    }
    const result = yield semesterRegistration_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.SemesterRegistrationServices = {
    createSemesterRegistrationInToDB,
    findAllSemesterRegistrationFromDB,
    findSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationInToDB,
};
