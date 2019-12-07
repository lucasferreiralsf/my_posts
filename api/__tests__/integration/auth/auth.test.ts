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
    mongoose.connection.dropCollection("users");
    done();
  });
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.dropCollection("users");
    mongoose.connection.close();
    done();
  });

  it("should authenticate a user with valid values", async () => {
    const user = await User.create(validUser);

    const response = await request(app)
      .post("/auth")
      .send({ email: validUser.email, password: validUser.password });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    await User.findOneAndDelete({ _id: user._id });
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

    await User.findOneAndDelete({ _id: response.body._id });
  });

  it("should delete a user.", async (done) => {
    const user = await User.create(validUser);
    request(app)
      .post("/auth")
      .send({ email: validUser.email, password: validUser.password }).then(async userLoggedin => {
        const response = await request(app)
          .delete("/auth")
          .set("Authorization", `Bearer ${userLoggedin.body.token}`);
    
        expect(response.status).toBe(200);
        done();
      });

  });
});
