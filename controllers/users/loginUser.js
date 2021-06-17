const Users = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateBody = require("../../utils/validateBody");
/**
 * @api {post} /login Login User
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam {String} email User's Email
 * @apiParam {String} password User's Password
 *
 * @apiSuccess {String} api Token
 * @apiSuccess {Object} user MongoDB User Object
 */
module.exports = async (req, res) => {
  try {
    //validate request for email and password
    if (validateBody(req, res)) return;
    const { email, password } = req.body;
    console.log("In user login.js");
    //check if email exists in DB
    console.log("-- Fetching email from database");
    const checkEmail = await Users.findOne({ email: email }).select(
      "-__v -createdAt -updatedAt "
    );
    if (!checkEmail) {
      console.log(`Email ${email} does not exist in Database`);
      return res.status(400).json({ message: "Email does not exist" });
    }
    // compare passwords
    console.log("-- Comparing passwords");
    const comparePassword = await bcrypt.compare(password, checkEmail.password);
    if (!comparePassword) {
      // passwords do not match
      console.log("Passwords do not match");
      return res.status(401).json({ message: "Wrong credentials" });
    }
    //attach id in payload
    const payload = {
      user: {
        id: checkEmail._id,
      },
    };
    // find how many refresh tokens does the user have
    const latestRT = checkEmail.refreshTokens.length;
    // grab the latest refresh token and set the refresh token to the latest RT found in the db
    // to prevent generation of refresh token everytime the user logs
    console.log(
      `-- Grabbing the latest refresh token found in the user's model `
    );
    const refreshToken = checkEmail.refreshTokens[latestRT - 1];
    //sign payload with server's secret token and send via jwt token
    console.log("-- Generating token");
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "24h",
    });

    //create httpOnly cookie for refresh token
    const options = {
      httpOnly: true,
    };
    //set refresh cookie with the new refresh token
    console.log(
      "-- Set Refresh token with the new Refreshed Token for further api calls"
    );
    res.cookie("refreshToken", refreshToken, options);
    return res
      .status(200)
      .json({ message: "Success", api: token, user: checkEmail });
  } catch (error) {
    console.log("-- Error in loginUser.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
