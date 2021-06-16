const Users = require("../../models/users");
const axios = require("axios");
module.exports = async (req, res) => {
  try {
    const paramOptions = {
      fields: "id,name,email,gender,picture,likes",
      access_token: process.env.FACEBOOK_API_KEY,
    };
    const response = await axios.get(`https://graph.facebook.com/v11.0/me`, {
      params: paramOptions,
    });
    console.log(response.data);
    return res.status(200).json({ message: "Success", api: response.data });
  } catch (error) {
    console.log("-- Error in getUserDetails.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
