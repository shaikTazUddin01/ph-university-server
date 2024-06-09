import { TCourses } from "./course.interface";
import { Courses } from "./course.model";

const createCourseInToDB = async (paylod: TCourses) => {
  const reslt = await Courses.create(paylod);
  return paylod;
};

const findCourseFormDB = async () => {
  const result = await Courses.find();

  return result;
};

const findSingleCourseFromDB = async (id: string) => {
  const result = await Courses.findById(id);
};

const DeleteCourseFromDB = async (id: string) => {
  const result = await Courses.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const CourseServices = {
  createCourseInToDB,
  findCourseFormDB,
  findSingleCourseFromDB,
  DeleteCourseFromDB,
};
