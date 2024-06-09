import { z } from "zod";


const perRequisteCoursesvalidation=z.object({
    courses:z.string()
})


const courseValidation=z.object({
    body:z.object({
        title:z.string(),
        prefix:z.string(),
        code:z.number(),
        credits:z.number(),
        perRequisteCourses:z.array(perRequisteCoursesvalidation).optional()
    })
})

export default courseValidation;