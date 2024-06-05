//year semestercode 4 digit number

import Faculty from "../Faculty/faculty.model";
import { TacademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

//for student
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

  // console.log(incrementId);

  return incrementId;
};

// for faculties

// find faculties id

export const faculty = async () => {
  const lastFacultyuserId = await Faculty.findOne(
    {},
    {
      id: 1,
      _id: 0,
    }
  ).sort({ createdAt: -1 });

  console.log("oldId", lastFacultyId);
  return lastFacultyuserId?.id || undefined;
};

export const lastFacultyId = async () => {
  const facultyId = await faculty();
  console.log("f-id", facultyId);
  if (facultyId) {
    const lastFacultyuserId = facultyId?.split("-");
    // console.log("last id:", lastFacultyuserId);

    let incrementId = (Number(lastFacultyuserId[1]) + 1)
      .toString()
      .padStart(4, "0");

    // console.log("incrementId",incrementId);
    const newFacultyId = `${lastFacultyuserId[0]}-${incrementId}`;
    // console.log("newId", newFacultyId);
    return newFacultyId;
  } else {
    const newFacultyId = "F-0001";
    return newFacultyId;
  }
};
