"use strict";
require("dotenv").config();
const serverModule = require("./src/server");
const mongoose = require("mongoose");

// ========================================== conneceting to database
const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
 let MONGOOSE_URL = process.env.MONGOOSE_URL;
mongoose.connect(MONGOOSE_URL, mongooseOptions);

serverModule.start();