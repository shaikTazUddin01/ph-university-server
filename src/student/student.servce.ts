import Student from "./student.interface";
import StudentModel from "./student.model";

// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student);

//   return result;
// };

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();

  return result;
};

const getSingleStudentsFromDb = async (id: string) => {
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
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
