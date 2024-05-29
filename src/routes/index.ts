import { Router } from "express";
import { StudentRoutes } from "../student/student.route";
import { userRouters } from "../user/user.router";

const router = Router();

const moduleRoutes=[
    {
        path:'/users',
        route:userRouters
    },
    {
        path:'/students',
        route:StudentRoutes
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

// router.use('/students',userRouters)
export default router;
