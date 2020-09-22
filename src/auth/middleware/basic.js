"use strict";
const base64 = require("base-64");

const UserSchema = require("../models/users-model");
/**
 * 
 * @param {*we will need the authrization in the headers to check the type and the token} req 
 * @param {*no input needed} res 
 * @param {* no input needed} next 
 */
module.exports = async (req, res, next) => {
  // pass the username and password to this method;
  // Basic Authentication (HTTP Headers)
  // we expect to have req headers
  // Basic YWhtYWRfc2hlbGEgOjEyMzQ=
  console.log("authorization",req.headers);
  const auth = req.headers.authorization.split(" ");
  if (auth[0] === "Basic") {
  // take the auth[1]: YWhtYWRfc2hlbGEgOjEyMzQ=
  // after decode user:pass
  // 1st decode auth[1] -> then split it on :
    const [username, password] = base64.decode(auth[1]).split(":");
    const authUser = new UserSchema({ username, password });
    console.log(authUser);
    const { isValid, user } = await authUser.authenticateUser();
    req.isValid = isValid;
    req.user = user;
    next();
  } else { next("Invalid Login!! "); }
 };
 