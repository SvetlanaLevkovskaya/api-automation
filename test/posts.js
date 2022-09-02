import supertest from "supertest";
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper.js";

const request = supertest("https://gorest.co.in/public/v2/");

const TOKEN =
  "79e27860fdc4558df908c73900abb42d520fb97d3ee56efd51dc7d000a0c857c";

describe("User Posts", () => {
  let postId, userId;

  before(async () => {
    userId = await createRandomUser();
  });

  it("POST /posts", async () => {
    const data = {
      user_id: userId,
      title: "Svetlana Title",
      body: "Svetlana blog post",
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
      //.get("posts/1333")
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer${TOKEN}`)
      .expect(404);
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

    it.only("422 Validation failed", async () => {
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
      expect(postRes.statusCode).to.eq(422);
      expect(postRes.body[0].field).to.eq("body");
      expect(postRes.body[0].message).to.eq("can't be blank");
    });
  });
});
