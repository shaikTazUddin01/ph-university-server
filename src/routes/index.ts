import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRouters } from "../modules/user/user.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.router";
import { academicFaculty } from "../modules/academicFaculty/academicFaculty.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    router: userRouters,
  },
  {
    path: "/students",
    router: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    router: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    router: academicFaculty,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

// router.use('/students',userRouters)
export default router;
