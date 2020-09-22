"use strict";

const express = require("express");
const basicAuth = require("./middleware/basic");
const UserSchema = require("./models/users-model");
const router = express.Router();
/**
 * get route to show all users
 */
router.get("/users", async (req, res) => {
    const data = await UserSchema.find({});
    res.status(200).send({ data });
  });
  /**
   * route to sign up 
   */
  router.post("/signup", async (req, res) => {
    const newUser = new UserSchema(req.body);
    const data = await newUser.save().catch(e => res.status(403).json("Name already taken allah b3enak try another one."));
    if(data.statusCode !== 403){
    res.status(200).json({ data });
    }
  });
  /**
   * route to sign in .
   */
  router.post("/signin", basicAuth, async (req, res) => {
    const { user, isValid } = req;
    if (isValid) {
      const authUser = new UserSchema({ username: user.username });
      const token = await authUser.generateToken();
      res.status(200).send({ user, token });
    } else {
      res.status(401).send({ msg: "username/password is incorrect" });
    }
  });
  
  module.exports = router;