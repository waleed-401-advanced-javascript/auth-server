"use strict";
function serverError(err, req, res, next){
  res.status(500).send({ msg: !err.message ? err : err.message });
  }
  
  module.exports = serverError;