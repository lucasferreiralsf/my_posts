import request from "supertest";
import mongoose from "mongoose";

import User from "../../../src/app/user/user.schema";

import app from "../../../src/app";

const validUser = {
  firstName: "User Test",
  lastName: "Valid",
  email: "emailteste@teste.com",
  password: "12345"
};

describe("Authentication", () => {
  beforeAll(done => {
    done();
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });

  it("should register a user with valid values", async () => {
    const user = await User.create(validUser);
    expect(user.email).toBe(validUser.email);

    const response = await request(app)
      .post("/auth")
      .send({ email: validUser.email, password: validUser.password });

    expect(response.status).toBe(200);

    await User.findOneAndDelete({ _id: user._id });
  });

  it("should authenticate a user with valid values", async () => {
    const user = await User.create(validUser);

    const response = await request(app)
      .post("/auth")
      .send({ email: validUser.email, password: validUser.password });

    expect(response.status).toBe(200);

    await User.findOneAndDelete({ _id: user._id });
  });
});
