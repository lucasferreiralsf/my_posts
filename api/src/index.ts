import "reflect-metadata";
import dotenv from "dotenv";

import app from "./app";
import configuration from "./config/config";

dotenv.config({
  path: "./config/config.ts"
});

app.listen(configuration.port || 3000);

console.log(
  `Library API server has started on http://localhost:${configuration.port ||
    4000}/`
);
