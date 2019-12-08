import mongoose from "mongoose";
import path from "path";
import config from "../../src/config/config";

mongoose
  .connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(db => {
    db.connection.dropDatabase();
    console.log("Database cleaned!");
    db.connection.close();
  });
