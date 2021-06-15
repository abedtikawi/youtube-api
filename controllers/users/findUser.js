const Users = require("../../models/users");

/**
 * @api {post} /me User Details
 * @apiName findUser
 * @apiGroup Users
 * @apiHeader {json} token Authorization value.
 * @apiHeaderExample {json} Header-Example:
 * 
 *     {
 *       "authorization": "Bearer token"
 *     }

 * @apiSuccess {Object} user MongoDB User Object
 */

module.exports = async (req, res) => {
  try {
    console.log("In findUser.js");
    // query database and find user with the id found in the request after being decoded in the jwt middleware
    console.log(`-- Querying the database for the user with id ${req.user.id}`);
    const findUser = await Users.findById({ _id: req.user.id }).select(
      "-__v -password  -createdAt -updatedAt"
    );
    if (!findUser) {
      // user does not exist in database
      console.log("User does not exist in database ");
      return res
        .status(400)
        .json({ message: "User does not exist in the database" });
    }
    console.log(
      `-- Sending user object in response for user ${findUser.email}`
    );
    //return user object

    return res.status(200).json({ message: "Success", api: findUser });
  } catch (error) {
    console.log("-- Error in findUser.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
