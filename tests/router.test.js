
"use strict";

const {
  server,
} = require("../src/server");
const supergoose = require("@code-fellows/supergoose");
const mockRequest = supergoose(server);
const jwt = require("jsonwebtoken");

describe("server.js", () => {

  it("test signup ", async () => {
    let theUser = {
      "username": "testUser",
      "password": "waleed",
    };
    mockRequest
      .post("/signup").send(theUser).then(data => {
        expect(data.status).toEqual(200);
      });
  });
  it("test signin ", async () => {
    const userData = {
      username: "waleed",
      password: "1234",
    };
    await mockRequest.post("/signup").send(userData);
    const results = await mockRequest.post("/signin").auth("waleed", "1234");
    // console.log(results);
    const token = jwt.verify(results.body.token,"secret");
    expect(token).toBeDefined();
  });

  it("test users ", () => {
    return mockRequest
      .get("/users").then(data => {
        expect(data.status).toEqual(200);
      });
  });

});

describe("Server error", ()=> {
  it("should respond with 500 for bad routes", async ()=>{
    const data = await mockRequest.get("/bad");
    expect(data.statusCode).toBe(500);
  });

  it("test 404 ", () => {
    return mockRequest
      .get("/no-route").then(data => {
        expect(data.status).toEqual(404);
      });
  });

});