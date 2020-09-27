/* eslint-disable consistent-return  */
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: false },
  email: { type: String, required: false },
  role: { type: String, enum: ["admin", "editor", "writer", "user"], default: "user" },
});

schema.plugin(uniqueValidator);

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.authenticateUser = function () {
  return new Promise((resolve, reject) => {
    const { username, password } = this;
    this.constructor.findOne({ username }).then(async (user) => {
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        resolve({ isValid, user });
      } else {
        reject(new Error("username/password incorrect"));
      }
    });
  });
};

schema.methods.generateToken = function () {
  const { username } = this;
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  return token;
};

schema.statics.decodeToken = function (token) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      this.findOne({ username: decoded.username }).then((user) => {
        if (!user) return reject(new Error("invalidToken!"));
        resolve(user);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const roles = {
  user: ["read"],
  editor: ["read", "create", "update"],
  admin: ["read", "create", "update", "delete"],
  writer: ["read", "create"],
};

schema.statics.can = function (userRole, permission) {
  return roles[userRole].includes(permission);
};

module.exports = mongoose.model("users", schema); // collection name - its schema