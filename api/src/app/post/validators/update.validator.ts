import { check } from "express-validator";

export const updatePostValidator = [
  check([
    "content",
  ]).notEmpty({ ignore_whitespace: true }).isString(),
];
