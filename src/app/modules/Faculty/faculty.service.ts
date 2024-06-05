import { TFaculty } from "./faculty.interface";
import Faculty from "./faculty.model";

// const createFacultyInToDB = async (payload: TFaculty) => {
//   //   console.log(payload);

//   const facultyData = payload;

//   const lastFacultyuser = await Faculty.findOne(
//     {},
//     {
//       id: 1,
//       _id: 0,
//     }
//   ).sort({ createdAt: -1 });

//   if (lastFacultyuser) {
//     let newFacultyId = (Number(lastFacultyuser.id) + 1)
//       .toString()
//       .padStart(4, "0");
//     facultyData.id = newFacultyId;
//   } else {
//     facultyData.id = "0001";
//   }

//   const result = await Faculty.create(facultyData);

//   return result;
// };

const findAllFacultyFromDB=async()=>{

  const result= await Faculty.find()
  return result
}
const findSingleFacultyFromDB=async(id : string)=>{

  const result= await Faculty.findOne({id})
  return result
}


export const facultyServices = {
  // createFacultyInToDB,
  findAllFacultyFromDB,
  findSingleFacultyFromDB
};
