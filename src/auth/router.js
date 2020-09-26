const express = require("express");

const router = express.Router();

const path = require("path");
const basicAuth = require("./middleware/basic");
const bearerAuth = require("./middleware/bearer-auth");
const oauth = require("./middleware/oauth");

const permissions = require("./middleware/authorize");

const UserSchema = require("./models/users-model");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "public", "index.html"));
});

router.get("/oauth", oauth, async (req, res) => {
  res.status(200).json({ token: req.token, user: req.user });
});

// ok
router.get("/read", bearerAuth, permissions("read"), (req, res) => {
  res.status(200).send({ msg: "read working" });
});

router.post("/create", bearerAuth, permissions("create"), (req, res) => {
  res.status(200).send({ msg: "add working" });
});

router.put("/update", bearerAuth, permissions("update"), (req, res) => {
  res.status(200).send({ msg: "update working" });
});

router.delete("/delete", bearerAuth, permissions("delete"), (req, res) => {
  res.status(200).send({ msg: "delete working" });
});

router.get("/users", async (req, res) => {
  const data = await UserSchema.find({});
  res.status(200).send({ data });
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = new UserSchema(req.body);
    const data = await newUser.save();
    res.status(201).send({ data });
  } catch (e) {
    next(new Error(e.message));
  }
});

router.post("/signin", basicAuth, async (req, res) => {
  const { user, isValid } = req;
  if (isValid) {
    const authUser = new UserSchema({ username: user.username });
    const token = authUser.generateToken();
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.status(200).send({ user, token });
  } else {
    res.status(401).send({ msg: "username/password is incorrect" });
  }
});

module.exports = router;