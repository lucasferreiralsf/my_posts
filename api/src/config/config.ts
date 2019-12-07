import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path:
    process.env.NODE_ENV === "test"
      ? path.resolve(__dirname + "../../../environments/.env.test")
      : process.env.NODE_ENV === "production"
      ? path.resolve(__dirname + "../../../environments/.env.production")
      : process.env.NODE_ENV === "development"
      ? path.resolve(__dirname + "../../../environments/.env.development")
      : path.resolve(__dirname + "../../../environments/.env")
});

export default {
  secretKey: process.env.SECRET_KEY || "",
  databaseUrl: process.env.DATABASE_URL || "",
  port: process.env.PORT
};
