import { z } from "zod";

const loginValidetionSchema = z.object({
    body:z.object({
        id:z.string({required_error:'Id is required.'}),
        password:z.string({required_error:'password is required.'})
    })
})

export const AuthValidation={
    loginValidetionSchema

}