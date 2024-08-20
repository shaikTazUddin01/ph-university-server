import httpStatus from "http-status";
import catchAsync from "../../utils/cathcAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseInToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully created a course",
    data: result,
  });
});

const findCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.findCourseFormDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve courses",
    data: result,
  });
});
const findSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.findSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve  course",
    data: result,
  });
});
const DeleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.DeleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully delete a course",
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseInToDB(id, req.body);
  // console.log(result);
  if (result == null) {
    throw new Error("course update failed");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course update successfully",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  // console.log(courseId,faculties);
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );
  //  console.log(faculties ,courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course faculties update successfully",
    data: result,
  });
});

const findFacultyWithCourse = catchAsync(async (req, res) => {
  // console.log(req.params.courseId);
  const { courseId } = req.params;
  const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "successfully retrieve  course",
    data: result,
  });
});


const removedFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removedFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );
  //  console.log(faculties ,courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course faculties removed successfully",
    data: result,
  });
});
export const courseController = {
  createCourse,
  findCourse,
  findSingleCourse,
  DeleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removedFacultiesWithCourse,
  findFacultyWithCourse
};
