import supertest from "supertest";
import { expect } from "chai";

const request = supertest("https://gorest.co.in/public/v2/");

const TOKEN =
  "79e27860fdc4558df908c73900abb42d520fb97d3ee56efd51dc7d000a0c857c";

describe("Users", () => {
  it("GET /users", (done) => {
    request.get(`users?access-token=${TOKEN}`).end((err, res) => {
      //console.log(err);
      //console.log(res);
      //console.log(res.body);
      expect(res.body).to.not.be.empty;
      done();
    });
  });
});
