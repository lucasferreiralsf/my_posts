import express, { Application, NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { errorHandler } from "./common/error-handler";
import { Routes } from "./routes";
import passportStrategy from "./app/auth/auth.strategy";
import configuration from "./config/config";

class AppController {
  express: Application;

  constructor() {
    dotenv.config({
      path: "./config/config.ts"
    });

    this.express = express();
    this.databaseInit();
  }

  databaseInit() {
    mongoose
      .connect(configuration.databaseUrl as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(async db => {
        // create express app

        // setup express app here
        this.middlewares();

        // register express routes from defined application routes
        this.routes();

        // ...

        // await db.connection
        //   .model("Category")
        //   .updateOne(
        //     { title: "Other" },
        //     { title: "Other", description: "Other category." },
        //     { upsert: true }
        //   );
      })
      .catch(error => console.log(error));
  }

  middlewares() {
    this.express.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    this.express.use(bodyParser.json());
    passportStrategy(passport);
    this.express.use(passport.initialize());
    this.express.use(errorHandler);
    this.express.use(cors({ origin: "*"}))
  }

  routes() {
    const next = (req: Request, res: Response, next: NextFunction) => next();
    Routes.forEach(route => {
      (this.express as any)[route.method](
        route.route,
        route.auth ? passport.authenticate("token", { session: false }) : next,
        route.criteria ? [route.criteria, route.validate] : next,
        (req: Request, res: Response, next: Function) => {
          try {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            // if (result instanceof Promise) {
            //   result.then(result =>
            //     result !== null && result !== undefined
            //     ? res.send(result)
            //     : undefined
            //     );
            //   } else if (result !== null && result !== undefined) {
            //     res.json(result);
            //   }
          } catch (error) {
            res.status(error.status).json(error.message);
          }
        }
      );
    });
  }
}

export default new AppController().express;
