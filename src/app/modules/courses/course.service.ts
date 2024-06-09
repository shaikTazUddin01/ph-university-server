import QueryBuilder from "../../builder/QueryBuilder";
import { CouserSearchAbleField } from "./course.constant";
import { TCourses } from "./course.interface";
import { Courses } from "./course.model";

const createCourseInToDB = async (paylod: TCourses) => {
  const result = await Courses.create(paylod);
  return result;
};

const findCourseFormDB = async (query:Record<string,unknown>) => {
  const courseQuery=new QueryBuilder(Courses.find().populate('perRequisteCourses.courses')
  ,query)
  .search(CouserSearchAbleField)
  .filter()
  .sort()
  .paginate()
  .fields()
  const result = await courseQuery.modelQuery

  return result;
};

const findSingleCourseFromDB = async (id: string) => {
  const result = await Courses.findById(id);
  return result
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
