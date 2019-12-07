import request from "supertest";
import mongoose from "mongoose";

import Post from "../../../src/app/post/post.schema";
import userSchema from "../../../src/app/user/user.schema";

import app from "../../../src/app";

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

  beforeAll(done => {
    mongoose.connection.dropCollection("users");
    mongoose.connection.dropCollection("posts");
    userSchema.create([validUser1, validUser2]).then(user => {
      request(app)
      .post("/auth")
      .send({ email: validUser1.email, password: validUser1.password })
      .then(response1 => {
        tokenUser1 = response1.body.token;
        user1Id = user[0]._id;
        request(app)
        .post("/auth")
        .send({ email: validUser2.email, password: validUser2.password })
        .then(response => {
          tokenUser2 = response.body.token;
          user2Id = user[1]._id;
          done();
        });
      });
    });
  });
  
  afterAll(done => {
    mongoose.connection.dropCollection("users");
    mongoose.connection.dropCollection("posts");
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
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

  // it("should delete a post.", async done => {
  //   const post = await Post.create(validPost);
  //   request(app)
  //     .post("/auth")
  //     .send({ email: validPost.email, password: validPost.password })
  //     .then(async postLoggedin => {
  //       const response = await request(app)
  //         .delete("/auth")
  //         .set("Authorization", `Bearer ${postLoggedin.body.tokenUser1}`);

  //       expect(response.status).toBe(200);
  //       done();
  //     });
  // });
});
