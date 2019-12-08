import { check } from "express-validator";
import userSchema from "../../user/user.schema";
import { HttpError } from "../../../common/error-handler";

export const registerValidator = [
  check([
    "firstName",
    "lastName",
    "password",
    "email"
  ]).notEmpty({ ignore_whitespace: true }),
  check(["email"])
    .isEmail()
    .custom(async email => {
      const user = await userSchema.findOne({ email });
      if (user) throw new HttpError("E-mail already in use", 400);
    }),
];