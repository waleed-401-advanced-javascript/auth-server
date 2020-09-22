"use strict";
const users = require("../models/users-model");
/**
 * 
 * @param {*we will need the authrization in the headers to check the type and the token} req 
 * @param {*no input needed} res 
 * @param {* no input needed} next 
 */
module.exports  = (req, res, next) => {
    console.log("authorization",req.headers.authorization);
    if (!req.headers.authorization) {
        return "Error authorization not exist .. !";
    }
    let newuser=new users();
    const auth = req.headers.authorization.split(" ");
    if (auth[0] === "Bearer") {
        console.log("req.headers.authorization ---> ", req.headers.authorization);
        const token = auth[1];
        newuser.bearerMiddleware(token).then(validuser => {
            //console.log('bearerMiddleware ---> valid : ', validuser);
            req.user = validuser;
            next();
        }).catch(err => next("Invalid Token!"));

    } else {
        return next("Invalid Bearer!!");
    }


}; 