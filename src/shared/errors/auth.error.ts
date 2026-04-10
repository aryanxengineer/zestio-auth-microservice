import { BaseError } from "./base.error.js";

export class AuthError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, 401, true);
  }
}