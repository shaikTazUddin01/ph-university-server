import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log(`my name is: ${name}`);
    //validation
    try {
      await schema.parseAsync({
        body: req.body,
        cookies:req.cookies
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
