"use strict";

// eslint-disable-next-line no-unused-vars
function notFound(req, res, next){
    res.status(404);
    res.statusMessage = "404 Not Found";
    res.json({ error: "Not Found" });
  }
  
  module.exports = notFound;