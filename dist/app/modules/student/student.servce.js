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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("./student.model"));
const AppErrors_1 = require("../../errors/AppErrors");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_const_1 = require("./student.const");
const getAllStudentsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const studentSearchableField = ["email", "name.middleName", "presentAddress"];
    //   let searchTerm = "";
    //   const queryObj = { ...query };
    //   if (query?.searchTerm) {
    //     searchTerm = query.searchTerm as string;
    //   }
    // //search query
    //   const searchQuery = StudentModel.find({
    //     $or: studentSearchableField.map((field) => ({
    //       [field]: { $regex: searchTerm, $options: "i" },
    //     })),
    //   });
    //   //filtering
    //   const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    //   excludeFields.forEach((el) => delete queryObj[el]);
    //   // console.log({query,queryObj});
    //   console.log({ query }, { queryObj });
    //   const filterquery = searchQuery
    //     .find(queryObj)
    // .populate("admissionSemester")
    // .populate({
    //   path: "academicDepartment",
    //   populate: {
    //     path: "academicFaculty",
    //   },
    // });
    // let sort = "-createdAt";
    // console.log(query);
    // let page = 1;
    // let limit = 1;
    // let skip = 0;
    // if (query.sort) {
    //   sort = query.sort as string;
    // }
    // if (query.limit) {
    //   limit = Number(query.limit);
    // }
    // console.log(sort);
    // const sortQuery = filterquery.sort(sort);
    // if (query.page) {
    //   page = Number(query.page);
    //   skip = (page - 1) * limit;
    // }
    // const paginateQuery = sortQuery.skip(skip);
    // const limitQuery = sortQuery.limit(limit);
    // let fields = "__v";
    // if (query.fields) {
    //   fields = (query.fields as string).split(",").join(" ");
    //   console.log("fields: ", { fields });
    // }
    // const fieldQuery = await limitQuery.select(fields);
    // return fieldQuery;
    const studentQuery = new QueryBuilder_1.default(student_model_1.default.find()
        .populate('user')
        .populate("admissionSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    }), query)
        .search(student_const_1.studentSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield studentQuery.countTotal();
    const result = yield studentQuery.modelQuery;
    return {
        meta,
        result
    };
});
// single student
const getSingleStudentsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.default.findById(id)
        .populate("admissionSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty",
        },
    });
    // const result = await StudentModel.findOne({ id });
    return result;
});
const deleteSutdentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.log(error);
    }
});
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    console.log(modifiedUpdatedData);
    const result = yield student_model_1.default.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.StudentServices = {
    // createStudentIntoDB,
    getAllStudentsFromDb,
    getSingleStudentsFromDb,
    deleteSutdentFromDb,
    updateStudentIntoDB,
};
