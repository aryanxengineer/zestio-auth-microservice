import type { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { ApiError } from "@shared/errors/api.error.js";

type ValidateTarget = "body" | "params" | "query";

export const validate =
  <T extends ZodTypeAny>(schema: T, target: ValidateTarget = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const dataToValidate = req[target];

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(", ");
      return next(new ApiError(message, 400));
    }

    // overwrite with sanitized data
    req[target] = result.data;

    next();
  };