const Users = require("../../models/users");
const validateBody = require("../../utils/validateBody");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @api {post} /register Register User
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiParam {String} fullName User's full name
 * @apiParam {String} email User's email
 * @apiParam {String} youtube_channel_id User's Youtube Channel Id
 * @apiParam {String} password User's password
 *
 * @apiSuccess {String} token authToken
 */
module.exports = async (req, res) => {
  try {
    // check and validate body for email , fullname and password
    if (validateBody(req, res)) return;
    console.log("In Users createUser.js");

    const { fullName, email, password } = req.body;
    const youtube_channel_id = req.body.channelID;
    // check if email exists in DB
    console.log(
      `-- checking if email ${email} or youtube channel exist exists in database `
    );
    const findUser = await Users.findOne({
      $or: [{ email: email }, { youtube_channel_id: youtube_channel_id }],
    });
    if (findUser) {
      console.log(`User already exists in database`);
      return res
        .status(400)
        .json({ message: "User already exists in Database" });
    }
    //generate salt to encrypt
    console.log("-- generating salt");
    const salt = await bcrypt.genSalt(10);
    //encrypt password with the generated Salt
    console.log("-- encrypting password with salt");
    const encryptedPassword = await bcrypt.hash(password, salt);

    //create user and insert into db
    console.log("-- inserting user into db");
    const createUser = await Users.create({
      fullName: fullName,
      email: email,
      password: encryptedPassword,
      youtube_channel_id: youtube_channel_id,
    });
    console.log("-- inserted user into db successfully");
    //attach id in payload
    const payload = {
      user: {
        id: createUser._id,
      },
    };
    //sign payload with server's secret token and send via jwt token
    console.log("-- generating token");
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .json({ message: "Success", api: token, user: createUser });
  } catch (error) {
    console.log("-- Error in createUser.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
