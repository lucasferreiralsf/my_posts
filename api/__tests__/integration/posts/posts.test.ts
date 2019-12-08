import request from "supertest";
import mongoose from "mongoose";

import Post from "../../../src/app/post/post.schema";
import userSchema from "../../../src/app/user/user.schema";

import app from "../../../src/app";
import { Db, Collection } from "mongodb";

const validPost = {
  content: "Content Post Test"
};

const validUser1 = {
  firstName: "User Test",
  lastName: "Valid",
  email: "emailteste@teste.com",
  password: "12345"
};

const validUser2 = {
  firstName: "User 2 Test",
  lastName: "Valid 2",
  email: "user2@teste.com",
  password: "12345"
};

describe("Posts", () => {
  let tokenUser1: string;
  let user1Id: string;
  let tokenUser2: string;
  let user2Id: string;
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
    // if(mongoose.connection.collections.users) mongoose.connection.dropCollection("users");
    // if(mongoose.connection.collections.posts) mongoose.connection.dropCollection("posts");

    done();
  });

  afterAll(async done => {
    // collections.map(async el => await el.drop());
    // if(mongoose.connection.collections.users) mongoose.connection.dropCollection("users");
    // if(mongoose.connection.collections.posts) mongoose.connection.dropCollection("posts");
    // Closing the DB connection allows Jest to exit successfully.
    await connection.connection.close();
    // await connection.disconnect();
    done();
  });

  beforeEach(async done => {
    await db.collection("users").deleteMany({});
    await db.collection("posts").deleteMany({});
    await userSchema.create([validUser1, validUser2]);

    const responseUser1 = await request(app)
      .post("/auth")
      .send({ email: validUser1.email, password: validUser1.password });
    tokenUser1 = responseUser1.body.token;
    user1Id = responseUser1.body._id;

    const responseUser2 = await request(app)
      .post("/auth")
      .send({ email: validUser2.email, password: validUser2.password });

    tokenUser2 = responseUser2.body.token;
    user2Id = responseUser2.body._id;
    done();
  });

  it("should create a post", async done => {
    request(app)
      .post("/post")
      .set("Authorization", `Bearer ${tokenUser1}`)
      .send(validPost)
      .then(async post => {
        expect(post.status).toBe(201);
        expect(post.body.content).toBe(validPost.content);
        expect(post.body.owner).toContain(user1Id);

        done();
      });
  });

  it("should update a post", async done => {
    const newContent = { content: "New Content!!!" };
    request(app)
      .post("/post")
      .set("Authorization", `Bearer ${tokenUser1}`)
      .send(validPost)
      .then(async post => {
        const response = await request(app)
          .put(`/post/${post.body._id}`)
          .set("Authorization", `Bearer ${tokenUser1}`)
          .send(newContent);

        expect(response.status).toBe(200);
        expect(response.body.content).toBe(newContent.content);

        done();
      });
  });

  it("should upVote a post", async done => {
    request(app)
      .post("/post")
      .set("Authorization", `Bearer ${tokenUser1}`)
      .send(validPost)
      .then(async post => {
        const response = await request(app)
          .post(`/post/upvote/${post.body._id}`)
          .set("Authorization", `Bearer ${tokenUser2}`)
          .send();

        expect(response.status).toBe(200);
        expect(response.body.upVotes[0]._id).toContain(user2Id);

        done();
      });
  });

  it("should delete a post", async done => {
    request(app)
      .post("/post")
      .set("Authorization", `Bearer ${tokenUser1}`)
      .send(validPost)
      .then(async post => {
        const response = await request(app)
          .delete(`/post/${post.body._id}`)
          .set("Authorization", `Bearer ${tokenUser1}`)
          .send();

        expect(response.status).toBe(200);

        done();
      });
  });
});
