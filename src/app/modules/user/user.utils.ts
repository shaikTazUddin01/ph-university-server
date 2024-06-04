//year semestercode 4 digit number

import { TacademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  // "2026 03 0002"
  return lastStudent?.id ? lastStudent.id : undefined;
  // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TacademicSemester) => {
  //first time 0000
  let currentId = (0).toString();
  // "2026 03 0002"
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);

  const currrentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currrentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    // "2026 03 0002"
    currentId = lastStudentId.substring(6);
  }
  // const currentId = (await findLastStudentId()) || (0).toString();

  //   console.log(await );
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  console.log(incrementId);

  return incrementId;
};
