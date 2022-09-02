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

  it("GET /users", () => {
    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });

  it("GET /users/:id", () => {
    return request.get(`users/2828?access-token=${TOKEN}`).then((res) => {
      expect(res.body.id).to.be.eq(2828);
    });
  });

  it("GET /users with query parameters", () => {
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
