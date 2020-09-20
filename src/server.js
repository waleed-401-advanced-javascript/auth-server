"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const notfound = require("./middleware/404");
const serverError =require("./middleware/500");
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRouter = require("./auth/router");
//  Routes
app.use("/", authRouter);

// 404 Errors
app.use("*", notfound);

// 500 Errors/Failsafe
app.use(serverError);


// ========================================================= exported server 

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    }
};