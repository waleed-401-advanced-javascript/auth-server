"use strict";
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  role:{ type: String,enum: ["admin", "editor", "writer","user"],
  default: "user"},
});

let roles = {
  user: ["read"],
  editor: ["read", "create", "update"],
  admin: ["read","read-submisi" , "create", "update", "delete"],
  writer: ["read", "create"]
};



schema.plugin(uniqueValidator);
/**
 * pre is a function from mongoose that let you have a call back function to run
 *  before  you used a method here we are using it to  hash the password before the 
 * save method.
 */
schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
/**
 * this method is to authinticate the user by getting the user name
 * and the password  and searching the database for same username
 * and then comparing using bycrypt.compare method.
 */
schema.methods.authenticateUser = async function () {
  const { username, password } = this;
  const user = await this.constructor.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return { isValid, user };
};
/**
 * this method generate a token when signing in and returns a toke for the session
 * using jasonwebtoken package anre returning it. 
 */
schema.methods.generateToken = async function () {
  const { username } = this;
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  return token;
};
/**
 * 
 * @param {*It TAKES the token generated and checks if it belongs to this session when hitting every route that requires login} token 
 */
schema.methods.bearerMiddleware = async function (token) {
  //console.log('bearerMiddleware----> ',token);
  try {
    let obj = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let data = obj.username;
    let getuser = await this.constructor.findOne({ username: data });
    //console.log('bearerMiddleware----> ', getuser.username);
    if (getuser.username) {
      return Promise.resolve({
        obj: obj,
        // actions: roles[user.role],
        // eslint-disable-next-line comma-dangle
        user: getuser.username
      });
    }
    else { return Promise.reject(); }
  } catch (error) {
    return Promise.reject();
  }
};
schema.methods.can = async function (permission){

console.log("user======>",permission);


};

module.exports = mongoose.model("users", schema); // collection name - its schema