import * as dotenv from "dotenv";
dotenv.config();
import request from "../config/common.js";
import { expect } from "chai";

const TOKEN = process.env.USER_TOKEN;

describe("Users", () => {
  let userId;
  describe("POST", () => {
    it(" /users", async() => {
      const data = {
        email: `test-${Math.floor(Math.random() * 855)}@gmail.com`,
        name: "svetlana",
        gender: "female",
        status: "active",
      };

      return await request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body);
          expect(res.body).to.deep.include(data);
          userId = res.body.id;
          console.log(userId);
        });
    });
  });

  describe("GET", () => {
    it("/users", () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body).to.not.be.empty;
      });
    });

    it("/users/:id", () => {
      return request
        .get(`users/${userId}?access-token=${TOKEN}`)
        .then((res) => {
          expect(res.body.id).to.be.eq(userId);
        });
    });

    it("/users with query parameters", () => {
      const url = `users?access-token=${TOKEN}&page=8&gender=female&status=active`;

      return request.get(url).then((res) => {
        expect(res.body).to.not.be.empty;
        //console.log(res.body);
        res.body.forEach((data) => {
          expect(data.gender).to.eq("female");
          expect(data.status).to.eq("active");
        });
      });
    });
  });

  describe("PUT", () => {
    it("/users/:id", async() => {
      const data = {
        status: "active",
        name: `sveta-${Math.floor(Math.random() * 855)}`,
      };
      return await request
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body);
          expect(res.body).to.deep.include(data);
        });
    });
  });
  describe("DELETE", () => {
    it("/users", () => {
      const message = { message: "Resource not found" };
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Barer ${TOKEN}`)
        .then((res) => {
          expect(res.body).to.deep.include(message);
          expect(res.body.message).to.eq("Resource not found");
          expect(res.statusCode).to.eq(404);
        });
    });
  });
});