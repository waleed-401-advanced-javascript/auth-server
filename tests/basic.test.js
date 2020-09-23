"use strict";
const { server } = require("../src/server");
const supergoose = require("@code-fellows/supergoose");
const mockRequest = supergoose(server);
const bcrypt = require("bcrypt");
const baiscMid = require("../src/auth/middleware/basic");
const basic = require("../src/auth/middleware/basic");

describe("Users ", () => {
    it("singup ", async () => {
        const Obj = {
            username: "Waleed",
            password: "waleed2546",
        };
        const data = await mockRequest.post("/signup").send(Obj);
        const record = data.body;
        console.log("record ============================>",record);
        // expect(record).toEqual(Obj);
        // expect(data.status).toEqual(200);
    
    });
    it("singin ", async () => {
        const Obj = {
            username: "Waleed Faraj3",
            password: "wal1e2ed2546",
        };
        const data = await mockRequest.post("/signup").send(Obj);
        const record = data.body;
        console.log("Data : ", record);
        const data_two = await mockRequest.post("/signup").send(Obj);
        expect(data_two.body).toEqual("Name already taken allah b3enak try another one.");
        

    });

    // it("basic middle ware is working",async ()=>{
    //     const req = { headers:  {
    //         authorization: "Basic c2FqYToxMjM0",
    //         "content-type": "application/json",
    //         "user-agent": "PostmanRuntime/7.26.5",
    //       }};
    //       console.log("req.headers",req.headers.authorization);
    //     const result = await basic(req);
    //     console.log(result);
    // });
});