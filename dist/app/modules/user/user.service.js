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
exports.UserService = void 0;
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const config_1 = __importDefault(require("../../config"));
const student_model_1 = __importDefault(require("../student/student.model"));
// import { NewUser } from "./user.interface";
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const AppErrors_1 = require("../../errors/AppErrors");
const http_status_1 = __importDefault(require("http-status"));
const faculty_model_1 = __importDefault(require("../Faculty/faculty.model"));
const admin_model_1 = __importDefault(require("../Admin/admin.model"));
const sendImageToClodinary_1 = require("../../utils/sendImageToClodinary");
//create student
const createStudentInToDB = (password, payload, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //create a user object
    const userData = {};
    // console.log(password);
    //if password is not given ,use deafult
    userData.password = password || config_1.default.default_pass;
    //set student role
    userData.role = "student";
    //set user email
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    //find academic semester info
    const admissionSemester = yield academicSemester_model_1.AcademicSemesterModel.findById(payload.admissionSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //manually generated it
        userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        //create a user(transaction - 1 )
        const newUser = yield user_model_1.User.create([userData], { session });
        // console.log("user", newUser);
        //create a student
        if (!newUser.length) {
            throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "failed to create user");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference_id
        //create a student (transaction- 2)
        const fileName = `${(_a = payload === null || payload === void 0 ? void 0 : payload.name) === null || _a === void 0 ? void 0 : _a.firstName}${userData.id}`;
        //send image to cloudinary
        const profileImg = yield (0, sendImageToClodinary_1.sendImageToCloudinary)(filePath, fileName);
        // console.log(secure_url);
        const newStudent = yield student_model_1.default.create([Object.assign(Object.assign({}, payload), { profileImg })], {
            session,
        });
        // console.log("new student", newStudent);
        if (!newStudent) {
            throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "failed to create new student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        console.log(error);
        // console.log(object);
        yield session.abortTransaction();
        yield session.endSession();
    }
});
//create Faculty
const createFacultyInToDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_pass;
    userData.role = "faculty";
    //set user email
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    // const session = await mongoose.startSession();
    // try {
    //   session.startTransaction();
    const newId = yield (0, user_utils_1.lastFacultyId)();
    console.log("ID", newId);
    payload.id = newId;
    userData.id = newId;
    const newUser = yield user_model_1.User.create(userData
    // , { session }
    );
    console.log(newUser);
    const newFaculty = yield faculty_model_1.default.create(payload
    // , { session }
    );
    // await session.abortTransaction();
    // await session.endSession();
    return newFaculty;
    // } catch (error) {
    //   console.log(error);
    //   await session.abortTransaction();
    //   await session.endSession();
    // }
});
//create admin
const createAdminInToDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password || config_1.default.default_pass;
    userData.role = "admin";
    //set user email
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    const newId = yield (0, user_utils_1.lastAdminId)();
    // console.log('ID',newId);
    payload.id = newId;
    userData.id = newId;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const newUser = yield user_model_1.User.create(userData);
    const newAdmin = yield admin_model_1.default.create(payload);
    return newAdmin;
});
const getMe = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    const { userId, role } = token;
    if (role === "student") {
        result = yield student_model_1.default.findOne({ id: userId }).populate("user");
    }
    if (role === "admin") {
        result = yield admin_model_1.default.findOne({ id: userId }).populate("user");
    }
    if (role === "faculty") {
        result = yield faculty_model_1.default.findOne({ id: userId }).populate("user");
    }
    return result;
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.UserService = {
    createStudentInToDB,
    createFacultyInToDB,
    createAdminInToDB,
    getMe,
    changeStatus,
};
