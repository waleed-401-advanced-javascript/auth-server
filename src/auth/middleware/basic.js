const base64 = require("base-64");

const User = require("../models/users-model");
/**
 * 
 * @param {*this will hold authorization of type basic that we need to sign up } req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = async (req, res, next) => {
  // pass the username and password to this method;
  // Basic Authentication (HTTP Headers)
  // we expect to have req headers
  // Basic YWhtYWRfc2hlbGEgOjEyMzQ=
  const auth = req.headers.authorization.split(" ");
  if (auth[0] === "Basic") {
  // take the auth[1]: YWhtYWRfc2hlbGEgOjEyMzQ=
  // after decode ahmad_shela:1234
  // 1st decode auth[1] -> then split it on :
    const [username, password] = base64.decode(auth[1]).split(":");
    const authUser = new User({ username, password });
    try {
      const { isValid, user } = await authUser.authenticateUser();
      req.isValid = isValid;
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  } else { next("Invalid Login!! "); }
};