import Student from "./student.interface";
import StudentModel from "./student.model";

// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student);

//   return result;
// };

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  return result;
};

const getSingleStudentsFromDb = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  // const result = await StudentModel.findOne({ id });

  return result;
};

const deleteSutdentFromDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });

  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentsFromDb,
  deleteSutdentFromDb,
};
