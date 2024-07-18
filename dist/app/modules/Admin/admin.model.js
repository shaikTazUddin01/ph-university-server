"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: [true, 'Designation is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: [true, 'Gender is required']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is required']
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact Number is required']
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required']
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required']
    },
    profileImage: {
        type: String
    },
    ManagementDepartment: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const Admin = (0, mongoose_1.model)('Admin', AdminSchema);
exports.default = Admin;
