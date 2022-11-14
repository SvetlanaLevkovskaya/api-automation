import * as dotenv from "dotenv";
dotenv.config();
import request from "../config/common.js";
import { expect } from "chai";
import { createRandomUserWithFaker } from "../helper/user_helper0.js";
import { faker } from "@faker-js/faker";

const TOKEN = process.env.USER_TOKEN;

describe("User Posts", () => {
  let postId, userId;

  before(async () => {
    //userId = await createRandomUser();
    userId = await createRandomUserWithFaker();
  });

  it("POST /posts", async () => {
    const data = {
      user_id: userId,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);

    console.log(postRes.body);
    expect(postRes.body).to.deep.include(data);
    postId = postRes.body.id;
    //console.log("postId", postId);
  });

  it("GET /posts/:id", async () => {
    const myposts = await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
      
    //console.log("userId", myposts.body.user_id);
    //console.log("postId ", myposts.body.id);
  });

  describe("Negative tests", () => {
    it("401 Authentication", async () => {
      const data = {
        user_id: userId,
        title: "Svetlana Title",
        body: "Svetlana blog post",
      };

      const postRes = await request.post("posts").send(data);

      console.log(postRes.statusCode);
      console.log(postRes.body.message);
      expect(postRes.statusCode).to.eq(401);
      expect(postRes.body.message).to.eq("Authentication failed");
    });

    it("422 Validation failed", async () => {
      const data = {
        user_id: userId,
        title: "Svetlana Title",
        //body: "Svetlana blog post",
      };

      const postRes = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);

      console.log(postRes.statusCode);
      console.log(postRes.body[0].message);
      //console.log(postRes.body);
      expect(postRes.statusCode).to.eq(422);
      expect(postRes.body[0].field).to.eq("body");
      expect(postRes.body[0].message).to.eq("can't be blank");
    });
  });
});
