const Users = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateBody = require("../../utils/validateBody");
/**
 * @api {post} /login Login User
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {String} token authToken
 */
module.exports = async (req, res) => {
  try {
    //validate request for email and password
    if (validateBody(req, res)) return;
    const { email, password } = req.body;
    console.log("In user login.js");
    //check if email exists in DB
    console.log("-- Fetching email from database");
    const checkEmail = await Users.findOne({ email: email });
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
    //sign payload with server's secret token and send via jwt token
    console.log("-- Generating token");
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "24h",
    });

    return res
      .status(200)
      .json({ message: "Success", api: token, user: checkEmail });
  } catch (error) {
    console.log("-- Error in loginUser.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
