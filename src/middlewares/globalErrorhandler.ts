import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import { handleZodError } from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import { handleCastError } from "../errors/handleCastError";
// import app from "../app";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong.!";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something is wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplefieldError = handleZodError(err);
    message = simplefieldError?.message;
    statusCode = simplefieldError?.statusCode;
    errorSources = simplefieldError?.errorSources;
    // console.log(simplefieldError);
  } else if (err?.name === "ValidationError") {
    const simplefieldError = handleValidationError(err);
    message = simplefieldError?.message;
    statusCode = simplefieldError?.statusCode;
    errorSources = simplefieldError?.errorSources;
  }else if(err?.name === "CastError"){
    const simplefieldError = handleCastError(err);
    message = simplefieldError?.message;
    statusCode = simplefieldError?.statusCode;
    errorSources = simplefieldError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
