import { faker } from "@faker-js/faker";
import supertest from "supertest";

const request = supertest("https://gorest.co.in/public/v2/");

const TOKEN =
  "79e27860fdc4558df908c73900abb42d520fb97d3ee56efd51dc7d000a0c857c";

export const createRandomUserWithFaker = async () => {
  const userData = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: "female",
    status: "active",
  };

  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);

    console.log(res.body)
  return res.body.id;
};
