/* eslint-disable no-undef */
// const { server }  = require("../src/server");
// const supergoose = require("@code-fellows/supergoose");
// const { request } = require("https");

// const mockRequest = supergoose(server);
// const base64 = require("base-64");



// // let mockBasicAuth = ["basic waleedfa:12345678"];
// describe("Routs tests",()=>{
//     it("POST to /signup to create a new user", ()=>{
//         let obj = {"username": "waleedfa", "password": "1234"};
//         return  mockRequest.post("/signup")
//           .send(obj)
//           .then(result=>{
//             console.log("signup",result.body);
//             expect(result.status).toEqual(200);
//         });
//     });
//     it("should respond with 200 for get ", async ()=>{
       
//         return  mockRequest.get("/users").then((res)=>{
//            expect(res.status).toBe(200);
//        }).catch(err=> {
//            console.log(err);
//        });
//    });
 
// // it("should respond with 403 for post signin with invalid username ", ()=>{
// //     let mockUser = {
// //         "username":"waleedfa",
// //         "password":"12345678"
// //     };
// //     let mockBasicAuth = ["basic waleedfa:12345678"];
// //       mockRequest.post("/signin").send(mockBasicAuth).then(result=>{
// //           console.log(result);
// //           expect(result.status).toEqual(200);
// //       });
     
// // });
// it("POST to /signin with invalid user ", ()=>{
//     let obj = {"username": "waleedfa", "password": "1234"};
    
//     let header={
//       headers:{
//         "authorization":"waleedfa:1234",
//       },
//     };
//     // let header2=header.headers;
//     let headers=base64.encode(header.headers.authorization);
//     console.log("header======>",headers);
//     let isValid = false;

//     return mockRequest.post("/signin").set({"authorization":headers})
//       .send(obj)
//       .then(data=>{
//         expect(data.status).toEqual(500);
//       });
//     });
//     it("POST to /signin with invalid user ",async ()=>{
//         let obj = {"username": "waleedfa", "password": "1234"};
//         const data = await mockRequest.post("/signup").send(obj);
//         let header={
//           headers:{
//             "authorization":"waleedfa:1234",
//           },
//         };
//         // let header2=header.headers;
//         let headers= base64.encode(header.headers.authorization);
//         // console.log("header======>",headers);
//         let req = {};
//         req.isValid = true;
//         req.user = "waleedfa";
    
//         return mockRequest.post("/signin").set({"authorization":headers})
//           .send(obj)
//           .then(data=>{
//               console.log("data====>",data.status);
//             expect(data.status).toEqual(500);
//           });
//         });
// });
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