/* eslint-disable no-undef */
require("dotenv").config();

const supergoose = require("@code-fellows/supergoose");

const jwt = require("jsonwebtoken");

const { server } = require("../src/server");

const mockRequest = supergoose(server);

describe("server.js", () => {
  it("test users", () => mockRequest
    .get("/users").then((data) => {
      expect(data.status).toEqual(200);
    }));
  it("test signup ", async () => {
    const theUser = {
      username: "waleed1",
      password: "1234756",
    };
    mockRequest
      .post("/signup").send(theUser).then((data) => {
        expect(data.status).toEqual(201);
      });
  });
  it("test signin", async () => {
    const userData = {
      username: "waleed",
      password: "1234756",
    };
    await mockRequest.post("/signup").send(userData);
    const results = await mockRequest.post("/signin").auth(userData.username, userData.password);
    const decoded = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    expect(decoded).toBeDefined();
  });
  it("test failled signin", async () => {
    try {
      const userData = {
        username: "notfound",
        password: "1234756",
      };
      await mockRequest.post("/signin").auth(userData.username, userData.password);
    } catch (e) {
      expect(e.message).toBe("username/password incorrect");
    }
  });
});

describe("Server error", () => {
  it("should respond with 500 for bad routes", async () => {
    const data = await mockRequest.get("/bad");
    expect(data.statusCode).toBe(500);
  });

  it("test 404", () => mockRequest
    .get("/no-route").then((data) => {
      expect(data.status).toEqual(404);
    }));
});

describe("test crud as a user", async () => {
  const userData = {
    username: "waleed",
    password: "1234756",

  };
  beforeEach(async () => {
    await mockRequest.post("/signup").send(userData);
  });

  it("test inValid Bearer", async () => {
    const data = await mockRequest.get("/read")
      .auth("token", {
        type: "bearer",
      });
    expect(data.body.msg).toBe("jwt malformed");
  });
  it("test Valid Bearer", async () => {
    const results = await mockRequest.post("/signin").auth(userData.username, userData.password);
    const data = await mockRequest.get("/secret")
      .auth(results.body.token, {
        type: "bearer",
      });
    expect(data.status).toBe(200);
  });

  it("test read", async () => {
    const results = await mockRequest.post("/signin").auth(userData.username, userData.password);
    const data = await mockRequest.get("/read")
      .auth(results.body.token, {
        type: "bearer",
      });
      console.log("daaaaaaaaaaaaaaaaaaaaaaaaataaa =>>>>>>",data);
    expect(data.statusCode).toBe(200);
  });
  it("test create", async () => {
    const results = await mockRequest.post("/signin").auth(userData.username, userData.password);
    const data = await mockRequest.post("/create")
      .auth(results.body.token, {
        type: "bearer",
      });
    expect(data.body.msg).toBe("Access Denied!");
  });
  it("test update", async () => {
    const results = await mockRequest.post("/signin").auth(userData.username, userData.password);
    const data = await mockRequest.put("/update")
      .auth(results.body.token, {
        type: "bearer",
      });
    expect(data.body.msg).toBe("Access Denied!");
  });
  it("test delete", async () => {
    const results = await mockRequest.post("/signin").auth(userData.username, userData.password);
    const data = await mockRequest.delete("/delete")
      .auth(results.body.token, {
        type: "bearer",
      });
    expect(data.body.msg).toBe("Access Denied!");
  });
});