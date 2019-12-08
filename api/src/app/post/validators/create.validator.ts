import { check } from "express-validator";

export const createPostValidator = [
  check([
    "content",
  ]).notEmpty({ ignore_whitespace: true }).isString(),
];