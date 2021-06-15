const Users = require("../../models/users");
/**
 * @api {post} /register Register User 
 * @apiName RegisterUser 
 * @apiGroup Users 
 * 
 * @apiParam {String} fullName User's full name
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 * 
 * @apiSuccess {String} token authToken
 */
module.exports = async (req, res) => {
  try {
    


    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("-- Error in createUser.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
