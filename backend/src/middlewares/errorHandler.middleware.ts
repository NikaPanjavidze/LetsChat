import { ErrorRequestHandler } from "express";
import StatusCodes from "http-status-codes";



export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
): any => {
  console.log(`Error occured: ${req.path}`, error);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Something went wrong",
  });
};
