import { StatusCodes } from "http-status-codes";

export const ErrorCodes = {
  ERR_INTERNAL: "ERR_INTERNAL",
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
  ERR_FORBIDDEN: "ERR_FORBIDDEN",
  ERR_NOT_FOUND: "ERR_NOT_FOUND",
} as const;

export type ErrorCodeType = keyof typeof ErrorCodes;

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    public errorCode: ErrorCodeType = ErrorCodes.ERR_INTERNAL
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class InternalServerException extends AppError {
  constructor(message = "Internal Server Error") {
    super(
      message,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorCodes.ERR_INTERNAL
    );
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Bad Request") {
    super(
      message,
      StatusCodes.BAD_REQUEST,
      ErrorCodes.ERR_BAD_REQUEST
    );
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized") {
    super(
      message,
      StatusCodes.UNAUTHORIZED,
      ErrorCodes.ERR_UNAUTHORIZED
    );
  }
}

export class ForbiddenException extends AppError {
  constructor(message = "Forbidden") {
    super(
      message,
      StatusCodes.FORBIDDEN,
      ErrorCodes.ERR_FORBIDDEN
    );
  }
}

export class NotFoundException extends AppError {
  constructor(message = "Resource Not Found") {
    super(
      message,
      StatusCodes.NOT_FOUND,
      ErrorCodes.ERR_NOT_FOUND
    );
  }
}