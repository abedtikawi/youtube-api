const jwt = require("jsonwebtoken");
const Users = require("../../models/users");

/**
 * @api {post} /refresh Refresh User Token
 * @apiName RefreshToken
 * @apiGroup Users
 * @apiHeaderExample {String} Header-Example:
 *     {
 *       "cookie": "refreshToken=<refresh token>"
 *     }
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "Bearer <your token>"
 *     }
 *
 * @apiSuccess {String} token User Token
 * @apiSuccess {Object} User MongoDB user Object
 */

module.exports = async (req, res) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(400).json({ message: "Missing JWT Token" });
    }

    let cookie = req.cookies.refreshToken;
    // check if cookie exist with refresh token
    console.log("In refreshtoken.js");
    if (!cookie) {
      return res.status(400).json({ message: "refresh token does not exist" });
    }
    // validate Refresh token against secret refresh token
    console.log("-- Check if jwt is authentic ");
    const validateRT = jwt.verify(cookie, process.env.REFRESH_TOKEN);

    if (!validateRT) {
      // handle if not valid across the server's secret refresh token
      console.log("cookie refresh token is not a valid token ");
      return res
        .status(401)
        .json({ message: "Refresh Token is not authentic" });
    }
    // retrieve from the httpOnly cookie the object user and save it in the request as req.user
    req.user = validateRT.user;

    //check if cookie exists in the user's refresh token array
    console.log(
      "-- Check if user exists in db and the refresh token presented belongs to him"
    );
    const findUser = await Users.findOne({
      $and: [{ _id: req.user.id }, { refreshTokens: cookie }],
    });

    if (!findUser) {
      // handle if user does not exist or refresh token does not exist
      console.log(
        "User does not have the presented refresh token in his refreshTokens array"
      );
      return res.status(401).json({ message: "Refresh Token is not valid" });
    }
    const payload = { user: { id: req.user.id } };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "24h",
    });
    // Generate lifetime RefreshToken
    console.log("-- Generating Refresh Token");
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
    console.log("-- Updating User refreshTokens Array");
    const updateUser = await Users.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { refreshTokens: refreshToken } }
    );

    //create httpOnly cookie for refresh token
    const options = {
      httpOnly: true,
    };
    //set refresh cookie with the new refresh token
    console.log("-- Set Refresh token with the new Refreshed Token");
    res.cookie("refreshToken", refreshToken, options);
    return res.status(200).json({
      message: "Success",
      api: token,
      user: updateUser,
    });
  } catch (error) {
    console.log("-- Error in RefreshToken.js");
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
