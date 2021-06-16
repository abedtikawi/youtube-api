const Users = require("../../models/users");
const bcrypt = require("bcrypt");
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
    if (Object.keys(req.body) == "") {
      return res.status(400).json({ message: "empty body" });
    }
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
      console.log(`-- Entry to be updated : ${entries[index]}`);
      updates[entries[index]] = values[index];
      if (entries[index] == "password") {
        console.log("in if statement");
        console.log(entries[index]);
        //generate salt to encrypt
        console.log("-- generating salt");
        const salt = await bcrypt.genSalt(10);
        //encrypt password with the generated Salt
        console.log("-- encrypting password with salt");
        const encryptedPassword = await bcrypt.hash(values[index], salt);
        updates[entries[index]] = encryptedPassword;
      }
    }

    console.log(`-- Starting update query`);
    // Update the user with the assigned values and keys
    const updateUser = await Users.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: updates }
    );

    console.log(`-- Update User Successfully`);
    const getUpdatedUser = await Users.findById(req.user.id).select(
      "-__v -createdAt -updatedAt -password"
    );
    return res
      .status(200)
      .json({ msg: "Successfully updated User", api: getUpdatedUser });
  } catch (error) {
    console.log(`-- Error occured in updateUser`);
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
