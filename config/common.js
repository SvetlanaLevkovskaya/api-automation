import supertest from "supertest";
import qa from "../config/qa.js";
const request = supertest(qa.baseURL);

export default request;
