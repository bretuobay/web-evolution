import type { Request, RequestHandler } from "express";
import { ApiError } from "./errorHandler";

type Validator = (value: unknown) => boolean;

type Schema = Record<string, Validator>;

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

export const schemaUtils = {
  requiredString: (label: string) => (value: unknown) => {
    if (!isString(value)) {
      throw new ApiError(400, `${label} must be a non-empty string`);
    }
    return true;
  },
  requiredNumber: (label: string) => (value: unknown) => {
    if (!isNumber(value)) {
      throw new ApiError(400, `${label} must be a number`);
    }
    return true;
  },
  optionalNumber: (label: string) => (value: unknown) => {
    if (value === undefined || value === null) {
      return true;
    }
    return schemaUtils.requiredNumber(label)(value);
  },
  optionalString: (label: string) => (value: unknown) => {
    if (value === undefined) {
      return true;
    }
    return schemaUtils.requiredString(label)(value);
  }
};

export function validateBody(schema: Schema): RequestHandler {
  return (req: Request, _res, next) => {
    try {
      const values = schema;
      for (const key of Object.keys(values)) {
        const validator = values[key];
        validator(req.body[key]);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
