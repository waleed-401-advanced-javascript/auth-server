"use srtict";
const Users = require("../models/users-model");
// check users roles and of they are allowed to do the action
/**
 * 
 * @param {It takes the type of action and comapre it to the users actions} action 
 */
module.exports = (action) => {
    return (req, res, next) => {
        // I already know that my token has both username and actions array
        // check actions value from the token and then check if action is in the actions array.
       console.log("in acl middleware !!! ");
       console.log("action===============================>", action); // this is coming from the bearerMiddleware.
        let newuser=new Users();
        console.log("action===============================>", action);
 
         newuser.can(action).then(auther => {
            console.log("action===============================>", action);
         });
            
        //     next();
        // }).catch(err => next("Invalid action")); 

        try {
            if (req.user.actions.includes(action)) {
                next();
            } else {
                // you have actions but you are trying 
                // to access a route that you dont have access on.
                next("Invalid Action! ");
            }
        } catch (e) {
            next("Invalid!");
        }
    };
};