const Users = require("../../models/users");

/**
 * @api {post} /update User Update
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiHeader {json} token Authorization value.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "Bearer token"
 *     }
 * @apiParam {String} fullName User's Full Name
 * @apiParam {String} email User's Email
 * @apiParam {String} password User's Password
 * @apiParam {String} channelID User's Youtube channel ID
 * @apiSuccess {Object} user MongoDB User Object
 */
module.exports = async (req, res) => {
  try {
    
    console.log("In updateUser");
    // Grab all keys from req.body to dynamically update
    const entries = Object.keys(req.body);
    console.log(`-- Updating User's ${entries}`);
    // Grab all keys from req.body to dynamically update
    const values = Object.values(req.body);
    // Create an object that will hold all key values to be updated
    let updates = {};
    console.log(`-- Creating the updates object  `);
    // Assign all values found in the request to the updates with the corresponding keys
    for (let index = 0; index < entries.length; index++) {
      updates[entries[index]] = values[index];
    }

    console.log(`-- Starting update query`);
    // Update the user with the assigned values and keys
    const updateUser = await Users.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: updates }
    );

    console.log(`-- Update User Successfully`);

    return res.status(200).json({ msg: "Success", api: updateUser });
  } catch (error) {
    console.log(`-- Error occured in updateUser`);
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
