"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyCourse = exports.Courses = void 0;
const mongoose_1 = require("mongoose");
const perRequisteCourseSchema = new mongoose_1.Schema({
    courses: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'course'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        trim: true,
    },
    credits: {
        type: Number,
        required: true,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    perRequisteCourses: [perRequisteCourseSchema],
}, { timestamps: true });
exports.Courses = (0, mongoose_1.model)("course", courseSchema);
const FacultiesWithCourse = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        ref: 'course'
    },
    faculties: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'faculty'
        }]
});
exports.FacultyCourse = (0, mongoose_1.model)("facultiesWithCourse", FacultiesWithCourse);
