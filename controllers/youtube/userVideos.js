const Users = require("../../models/users");
const axios = require("axios");
module.exports = async (req, res) => {
  try {
    const findUser = await Users.findById(req.user.id);
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const queryOptions = {
      part: "snippet,contentDetails,statistics",
      id: `${findUser.youtube_channel_id}`,
      key: `${process.env.CLIENT_API_KEY}`,
    };
    const headers = {
      Accept: "application/json",
    };
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels`,
      { params: queryOptions },
      headers
    );


    return res.status(200).json({ message: "Success", api: response.data });
  } catch (error) {
    console.log("-- Error in userVideos.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
