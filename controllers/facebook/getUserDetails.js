const axios = require("axios");
module.exports = async (req, res) => {
  try {
    // get the user id from user's jwt
    // get facebookID of the  user from the database
    // authenticate the user to get access token
    // then perform the axios request with the user's token to recieve the params.fields values
    const paramOptions = {
      fields: "id,name,email,gender,picture,likes",
      // there must be a login screen to authenticate the user using OAUTH and then the access token 
      access_token: process.env.FACEBOOK_API_KEY,
    };

    const response = await axios.get(`https://graph.facebook.com/v11.0/me`, {
      params: paramOptions,
    });

    return res.status(200).json({ message: "Success", api: response.data });
  } catch (error) {
    console.log("-- Error in getUserDetails.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
