import request from "supertest";
import mongoose from "mongoose";

import User from "../../../src/app/user/user.schema";

import app from "../../../src/app";
import config from "../../../src/config/config";
import { Collection, Db } from "mongodb";

const validUser = {
  firstName: "User Test",
  lastName: "Valid",
  email: "emailteste@teste.com",
  password: "12345"
};

describe("Authentication", () => {
  let connection: mongoose.Mongoose;
  let db: Db;
  let collections: Collection<any>[];

  beforeAll(async done => {
    connection = await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.connection.db;
    collections = await db.collections();
    // collections.map(async el => await el.drop());
    done();
  });
  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    // collections.map(async el => await el.drop());
    await connection.connection.close();
    done();
  });

  beforeEach(async (done) => {
    await db.collection("users").deleteMany({});
    done();
  });

  it("should authenticate a user with valid values", async () => {
    const user = await User.create(validUser);

    const response = await request(app)
      .post("/auth")
      .send({ email: validUser.email, password: validUser.password });

    // await User.findOneAndDelete({ _id: user._id });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should register a user with valid values", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        firstName: "User Test",
        lastName: "Valid",
        email: "emailteste@teste.com",
        password: "12345"
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(validUser.email);
    // await User.findOneAndDelete({ _id: response.body._id });
  });

  

  it("should delete a user.", async done => {
    const user = await User.create(validUser);
    request(app)
      .post("/auth")
      .send({ email: validUser.email, password: validUser.password })
      .then(async userLoggedin => {
        const response = await request(app)
          .delete("/auth")
          .set("Authorization", `Bearer ${userLoggedin.body.token}`);

        expect(response.status).toBe(200);
        done();
      });
  });
});
