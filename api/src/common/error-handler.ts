import { Request, Response, NextFunction } from "express";

export class HttpError {
  message: any;
  status: number;

  constructor(message: any, status = 500) {
    this.message = message;
    this.status = status;
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.stack) console.error(err.stack);
  err.status ? res.status(err.status) : res.status(500);
  res.json(err);
}
