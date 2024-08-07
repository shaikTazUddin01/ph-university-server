"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
const zod_1 = require("zod");
const validator_1 = __importDefault(require("validator"));
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, "First name is required")
        .max(20, "First name max length 20 characters")
        .refine((val) => val.trim() === val, {
        message: "First name should not have leading or trailing spaces",
    })
        .refine((val) => val.charAt(0).toUpperCase() + val.slice(1) === val, {
        message: "First name should be capitalized",
    }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .min(1, "Last name is required")
        .refine((val) => validator_1.default.isAlpha(val), {
        message: "Last name should contain only alphabetic characters",
    }),
});
const guardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, "Father's name is required"),
    fatherOccupation: zod_1.z.string().min(1, "Father's occupation is required"),
    fatherContactNo: zod_1.z.string().min(1, "Father's contact number is required"),
    motherName: zod_1.z.string().min(1, "Mother's name is required"),
    motherOccupation: zod_1.z.string().min(1, "Mother's occupation is required"),
    motherContactNo: zod_1.z.string().min(1, "Mother's contact number is required"),
});
const localGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Local guardian's name is required"),
    occupation: zod_1.z.string().min(1, "Local guardian's occupation is required"),
    contactNo: zod_1.z.string().min(1, "Local guardian's contact number is required"),
    address: zod_1.z.string().min(1, "Local guardian's address is required"),
});
const createStudentZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        // Assuming `id` is generated by MongoDB or handled elsewhere
        studentInfo: zod_1.z.object({
            name: userNameSchema,
            // password: z.string().min(1, "pass is required"),
            gender: zod_1.z.enum(["male", "female"], {
                required_error: "Gender is required",
                invalid_type_error: "Invalid gender",
            }),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string()
                .email("Invalid email address")
                .min(1, "Email is required"),
            contactNo: zod_1.z.string().min(1, "Contact number is required"),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, "Emergency contact number is required"),
            bloodgroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
                required_error: "Blood group is required",
                invalid_type_error: "Invalid blood group",
            }),
            presentAddress: zod_1.z.string().min(1, "Present address is required"),
            permanentAddress: zod_1.z.string().min(1, "Permanent address is required"),
            guardian: guardianSchema,
            localGuardian: localGuardianSchema,
            // profileImg: z.string().optional(),
            admissionSemester: zod_1.z.string()
        }),
    }),
});
const updateuserNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, "First name is required")
        .max(20, "First name max length 20 characters")
        .refine((val) => val.trim() === val, {
        message: "First name should not have leading or trailing spaces",
    })
        .refine((val) => val.charAt(0).toUpperCase() + val.slice(1) === val, {
        message: "First name should be capitalized",
    }).optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .min(1, "Last name is required")
        .refine((val) => validator_1.default.isAlpha(val), {
        message: "Last name should contain only alphabetic characters",
    }).optional(),
});
const updateguardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, "Father's name is required").optional(),
    fatherOccupation: zod_1.z.string().min(1, "Father's occupation is required").optional(),
    fatherContactNo: zod_1.z.string().min(1, "Father's contact number is required").optional(),
    motherName: zod_1.z.string().min(1, "Mother's name is required").optional(),
    motherOccupation: zod_1.z.string().min(1, "Mother's occupation is required").optional(),
    motherContactNo: zod_1.z.string().min(1, "Mother's contact number is required").optional(),
}).partial();
const updatelocalGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Local guardian's name is required").optional(),
    occupation: zod_1.z.string().min(1, "Local guardian's occupation is required").optional(),
    contactNo: zod_1.z.string().min(1, "Local guardian's contact number is required").optional(),
    address: zod_1.z.string().min(1, "Local guardian's address is required").optional(),
}).partial();
const updateStudentZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        studentInfo: zod_1.z.object({
            name: updateuserNameSchema.optional(),
            gender: zod_1.z.enum(["male", "female"], {
                required_error: "Gender is required",
                invalid_type_error: "Invalid gender",
            }).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string()
                .email("Invalid email address")
                .min(1, "Email is required")
                .optional(),
            contactNo: zod_1.z.string().min(1, "Contact number is required").optional(),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, "Emergency contact number is required")
                .optional(),
            bloodgroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
                required_error: "Blood group is required",
                invalid_type_error: "Invalid blood group",
            }).optional(),
            presentAddress: zod_1.z.string().min(1, "Present address is required").optional(),
            permanentAddress: zod_1.z.string().min(1, "Permanent address is required").optional(),
            guardian: updateguardianSchema.optional(),
            localGuardian: updatelocalGuardianSchema.optional(),
            profileImg: zod_1.z.string().optional(),
            admissionSemester: zod_1.z.string().optional(),
        }).partial(),
    }),
});
exports.studentValidations = { createStudentZodValidation, updateStudentZodValidation };
