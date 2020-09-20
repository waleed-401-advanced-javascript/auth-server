"use strict";
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // fullname: { type: String, required: true },
  // email: { type: String, required: true },
});

schema.plugin(uniqueValidator);

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.authenticateUser = async function () {
  const { username, password } = this;
  const user = await this.constructor.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return { isValid, user };
};

schema.methods.generateToken = async function () {
  const { username } = this;
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = mongoose.model("users", schema); // collection name - its schema