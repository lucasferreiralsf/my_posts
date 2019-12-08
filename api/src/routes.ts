import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { loginValidator } from "./app/auth/validators/login.validator";
import { AuthController } from "./app/auth/auth.controller";
import { registerValidator } from "./app/auth/validators/register.validator";
import { PostController } from "./app/post/post.controller";
import { createPostValidator } from "./app/post/validators/create.validator";
import { updatePostValidator } from "./app/post/validators/update.validator";

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
  },
  {
    method: "delete",
    route: "/auth",
    auth: true,
    controller: AuthController,
    action: "delete"
  },
];

const postRoutes = [
  {
    method: "get",
    route: "/post",
    controller: PostController,
    action: "all"
  },
  {
    method: "get",
    route: "/post/:id",
    controller: PostController,
    action: "one"
  },
  {
    method: "post",
    route: "/post",
    auth: true,
    criteria: createPostValidator,
    validate: validate,
    controller: PostController,
    action: "create"
  },
  {
    method: "put",
    route: "/post/:id",
    auth: true,
    criteria: updatePostValidator,
    validate: validate,
    controller: PostController,
    action: "update"
  },
  {
    method: "post",
    route: "/post/upvote/:id",
    auth: true,
    controller: PostController,
    action: "upVote"
  },
  {
    method: "delete",
    route: "/post/:id",
    auth: true,
    controller: PostController,
    action: "delete"
  }
];

export const Routes: {
  method: string;
  route: string;
  controller: any;
  action: string;
  auth?: boolean;
  criteria?: any;
  validate?: any;
}[] = [...authRoutes, ...postRoutes];
