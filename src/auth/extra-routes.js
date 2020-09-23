"use strict";

const express = require("express");
const router = express.Router();
const bearerMiddleware = require("../auth/middleware/bearer-auth");
const permissions = require("../auth/middleware/authorize");

/**
 * this route is for testing the bearer token middleware.
 */

router.get("/secret", bearerMiddleware, (req,res)=>{
  res.status(200).json(req.user);
});
router.get("/read", bearerMiddleware, permissions("read"),(req,res)=>{
  res.status(200).send(" read working ");
});
router.post("/add", bearerMiddleware, permissions("create"),(req,res)=>{
  res.status(200).send(" add working ");
});
  router.put("/change", bearerMiddleware, permissions("update"),(req,res)=>{
    res.status(200).send("update working ");
  });
  router.delete("/change", bearerMiddleware, permissions("delete"),(req,res)=>{
    res.status(200).send(" delete working ");
  });

module.exports = router; 