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
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const AppErrors_1 = require("../../errors/AppErrors");
const http_status_1 = __importDefault(require("http-status"));
const createCourseInToDB = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Courses.create(paylod);
    return result;
});
const findCourseFormDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Courses.find().populate("perRequisteCourses.courses"), query)
        .search(course_constant_1.CouserSearchAbleField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const findSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Courses.findById(id).populate("perRequisteCourses.courses");
    return result;
});
const DeleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Courses.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
const updateCourseInToDB = (id, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const { perRequisteCourses } = paylod, CourseInfo = __rest(paylod, ["perRequisteCourses"]);
    // console.log(id);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateCourse = yield course_model_1.Courses.findByIdAndUpdate(id, CourseInfo, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updateCourse) {
            throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to update course");
        }
        // console.log(perRequisteCourses);
        if (perRequisteCourses && (perRequisteCourses === null || perRequisteCourses === void 0 ? void 0 : perRequisteCourses.length) > 0) {
            const deletePerRequiste = perRequisteCourses === null || perRequisteCourses === void 0 ? void 0 : perRequisteCourses.filter((el) => el.courses && (el === null || el === void 0 ? void 0 : el.isDeleted)).map((el) => el === null || el === void 0 ? void 0 : el.courses);
            //filter out deleted field
            const deletePerRequisteCourses = yield course_model_1.Courses.findByIdAndUpdate(id, {
                $pull: {
                    perRequisteCourses: { courses: { $in: deletePerRequiste } },
                },
            }, {
                new: true,
                session,
            });
            if (!deletePerRequisteCourses) {
                throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to update course");
            }
            const newPerRequiste = perRequisteCourses === null || perRequisteCourses === void 0 ? void 0 : perRequisteCourses.filter((el) => el.courses && (el === null || el === void 0 ? void 0 : el.isDeleted) != true);
            //added new courses
            const newPerRequisteCourses = yield course_model_1.Courses.findByIdAndUpdate(id, {
                $addToSet: { perRequisteCourses: { $each: newPerRequiste } },
            }, {
                new: true,
                session,
            });
            if (!newPerRequisteCourses) {
                throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to update course");
            }
        }
        const result = yield course_model_1.Courses.findById(id).populate("perRequisteCourses.courses");
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to update course");
    }
});
const assignFacultiesWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.FacultyCourse.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } },
    }, {
        upsert: true,
        new: true,
    });
    return result;
    // console.log(id,payload);
});
const removedFacultiesWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.FacultyCourse.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } }
    }, {
        new: true,
    });
    return result;
    // console.log(id,payload);
});
exports.CourseServices = {
    createCourseInToDB,
    findCourseFormDB,
    findSingleCourseFromDB,
    DeleteCourseFromDB,
    updateCourseInToDB,
    assignFacultiesWithCourseIntoDB,
    removedFacultiesWithCourseIntoDB
};
