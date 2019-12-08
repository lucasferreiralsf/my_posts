import { Request } from "express";
import Passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import User from "../user/user.schema";

export default (passport: Passport.PassportStatic) => {
  passport.use(
    "token",
    new JwtStrategy(
      {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true
      },
      async (req: Request, payload: any, cb: Function) => {
        try {
          const user = await User.findOne({ email: payload.email });
          if (!user) {
            cb(null, false);
          }

          return cb(null, user);
        } catch (error) {
          cb(error, false);
        }
      }
    )
  );
};
