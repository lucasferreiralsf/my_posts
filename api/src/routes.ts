import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
// import { UserController } from "./user/user.controller";
import { loginValidator } from "./app/auth/validators/login.validator";
import { AuthController } from "./app/auth/auth.controller";
import { registerValidator } from "./app/auth/validators/register.validator";
// import { updateUserValidator } from "./user/validators/update.validator";
// import { BookController } from "./book/book.controller";
// import { createBookValidator } from "./book/validators/create.validator";
// import { updateBookValidator } from "./book/validators/update.validator";

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  return next();
}

const authRoutes = [
  {
    method: "post",
    route: "/auth",
    criteria: loginValidator,
    validate: validate,
    controller: AuthController,
    action: "login"
  },
  {
    method: "post",
    route: "/auth/register",
    criteria: registerValidator,
    validate: validate,
    controller: AuthController,
    action: "register"
  }
];

// const userRoutes = [
//   {
//     method: "get",
//     route: "/user",
//     controller: UserController,
//     action: "all"
//   },
//   {
//     method: "get",
//     route: "/user/:id",
//     auth: true,
//     controller: UserController,
//     action: "one"
//   },
//   {
//     method: "put",
//     route: "/user/:id",
//     auth: true,
//     criteria: updateUserValidator,
//     validate: validate,
//     controller: UserController,
//     action: "update"
//   },
//   {
//     method: "post",
//     route: "/user/favorite/:id",
//     auth: true,
//     controller: UserController,
//     action: "favoriteBook"
//   },
//   {
//     method: "delete",
//     route: "/user/:id",
//     auth: true,
//     controller: UserController,
//     action: "deleteAccount"
//   }
// ];

// const bookRoutes = [
//   {
//     method: "get",
//     route: "/book",
//     controller: BookController,
//     action: "all"
//   },
//   {
//     method: "get",
//     route: "/book/:id",
//     controller: BookController,
//     action: "one"
//   },
//   {
//     method: "post",
//     route: "/book",
//     auth: true,
//     criteria: createBookValidator,
//     validate: validate,
//     controller: BookController,
//     action: "create"
//   },
//   {
//     method: "put",
//     route: "/book/:id",
//     auth: true,
//     criteria: updateBookValidator,
//     validate: validate,
//     controller: BookController,
//     action: "update"
//   },
//   {
//     method: "delete",
//     route: "/book/:id",
//     auth: true,
//     controller: BookController,
//     action: "delete"
//   }
// ];

export const Routes: {
  method: string;
  route: string;
  controller: any;
  action: string;
  auth?: boolean;
  criteria?: any;
  validate?: any;
}[] = [...authRoutes];
