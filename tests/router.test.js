/* eslint-disable no-undef */
// const { server }  = require("../src/server");
// const supergoose = require("@code-fellows/supergoose");
// const { request } = require("https");

// const mockRequest = supergoose(server);


// let mockBasicAuth = ["basic waleedfa:12345678"];
// describe("Routs tests",()=>{
//     it("should respond with 200 for get ", async ()=>{
       
//         return  mockRequest.get("/users").then(()=>{
//            expect(res.status).toBe(200);
//        }).catch(err=> {
//            console.log(err);
//        });
//    });
 
// it("should respond with 403 for post signup with invalid username ", ()=>{
//     let mockUser = {
//         username:"waleedfa",
//         password:"12345678"
//     };
//       mockRequest.post("/signup").send(mockUser);
//       let user = res.body;
//       expect(mockUser[username]).toEqual(user[username]);

// });
// });