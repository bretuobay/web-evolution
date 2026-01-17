import type { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  constructor(public readonly status: number, message: string, public readonly details?: unknown) {
    super(message);
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({ status: err.status, message: err.message, details: err.details });
  }
  const status = err instanceof Error ? 500 : 500;
  const message = err instanceof Error ? err.message : "Internal Server Error";
  res.status(status).json({ status, message });
}
