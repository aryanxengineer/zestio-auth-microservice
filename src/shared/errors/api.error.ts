import { BaseError } from "./base.error";

export class ApiError extends BaseError {
  constructor(message: string, statusCode = 500) {
    super(message, statusCode, true);
  }
}