import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import User, { IUser } from "../user/user.schema";
import { HttpError } from "../../common/error-handler";
import config from "../../config/config";

export class AuthController {
  // private userRepository = getRepository(User);

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(201).json(await User.create(request.body));
    } catch (error) {
      next(new HttpError(error, 400));
    }
  }

  async delete(
    request: Request & { user: IUser },
    response: Response,
    next: NextFunction
  ) {
    const user: IUser = await User.findOneAndDelete({ _id: request.user._id });
    if (!user) {
      next(new HttpError("Email or password invalid.", 401));
    } else {
      response.status(200).json({});
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    // try {
    const user: IUser = await User.findOne({ email: request.body.email });
    if (!user) {
      response.status(404).json({});
    }

    const { _id, email, firstName, lastName } = user;

    if (await user.comparePassword(request.body.password)) {
      const token = jwt.sign({ email }, config.secretKey, { expiresIn: "2h" });
      response.status(200).json({
        _id,
        firstName,
        lastName,
        token
      });
    } else {
      next(new HttpError("Email or password invalid.", 401));
    }
    // } catch (error) {
    //   next(new HttpError(error, 400));
    // }
  }
}
