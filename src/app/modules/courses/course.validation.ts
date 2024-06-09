import { z } from "zod";


const perRequisteCoursesvalidation=z.object({
    courses:z.string(),
    isDeleted:z.boolean()
})


const courseValidation=z.object({
    body:z.object({
        title:z.string(),
        prefix:z.string(),
        code:z.number(),
        credits:z.number(),
        isDeleted:z.boolean(),
        perRequisteCourses:z.array(perRequisteCoursesvalidation)
    })
})

export default courseValidation;