const Users = require("../../models/users");
const axios = require("axios");
module.exports = async (req, res) => {
  try {
    const findUser = await Users.findById(req.user.id);
    const headers = {
      Accept: "application/json",
    };
    const channelQuery = {
      part: "snippet,contentDetails,statistics",
      id: `${findUser.youtube_channel_id}`,
      key: `${process.env.CLIENT_API_KEY}`,
    };

    const getChannel = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels`,
      { params: channelQuery },
      headers
    );
    if (getChannel.data.pageInfo.totalResults === 0) {
      return res
        .status(400)
        .json({ message: "This channel has no videos on Youtube " });
    }
    const channel = getChannel.data.items[0];
    const playlistId = channel.contentDetails.relatedPlaylists.uploads;

    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const playlistQuery = {
      part: "snippet",
      playlistId: playlistId,
      key: `${process.env.CLIENT_API_KEY}`,
    };

    const getPlaylists = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems`,
      { params: playlistQuery },
      headers
    );
    const videos = getPlaylists.data.items;
    if (!videos) {
      return res
        .status(400)
        .json({ message: "This Youtube Channel does not have videos" });
    }
    let youtubeVideos = [];
    videos.forEach((element) => {
      let obj = {
        videoURL: `https://www.youtube.com/watch?v=${element.snippet.resourceId.videoId}`,
      };
      youtubeVideos.push(obj);
    });

    return res.status(200).json({
      message: "Success",
      api: youtubeVideos,
    });
  } catch (error) {
    console.log("-- Error in userVideos.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
