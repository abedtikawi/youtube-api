const Users = require("../../models/users");
const axios = require("axios");
/**
 * @api {get} / Get User videos
 * @apiName Get Youtube Videos
 * @apiGroup Youtube
 * @apiHeader {json} token Authorization value.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "Bearer token"
 *     }
 * @apiSuccess {Object} api Array of objects with 50 as max youtube video results
 */
module.exports = async (req, res) => {
  try {
    console.log("In userVideos.js");
    console.log("-- Querying database to find User");
    // Find user with the id found in the jwt payload
    const findUser = await Users.findById(req.user.id);
    // create the request header and query
    if (!findUser) {
      //handle manipulated mongoose._id
      console.log("User does not exist in the database");
      return res.status(400).json({ message: "User does not exist" });
    }
    const headers = {
      Accept: "application/json",
    };
    console.log("-- Requesting the youtube api to find the channel");
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
    // handle non youtube playlists
    if (getChannel.data.pageInfo.totalResults === 0) {
      console.log("This channel does not exist on youtube");
      return res
        .status(400)
        .json({ message: "This channel has no videos on Youtube " });
    }
    console.log("-- Channel found");
    // save the parent playlist id found in the channel
    const channel = getChannel.data.items[0];
    const playlistId = channel.contentDetails.relatedPlaylists.uploads;

    const playlistQuery = {
      part: "snippet",
      playlistId: playlistId,
      maxResults: 50,
      key: `${process.env.CLIENT_API_KEY}`,
    };

    const getPlaylists = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems`,
      { params: playlistQuery },
      headers
    );
    // Save the videos found in the playlists items.
    const videos = getPlaylists.data.items;
    if (!videos) {
      // handle if user is on youtube but does not have any vidoes
      console.log("No videos found for this channel");
      return res
        .status(400)
        .json({ message: "This Youtube Channel does not have videos" });
    }
    // create an array to hold the video objects.
    console.log("-- Creating a youtubeVideos array to hold video objects ");
    let youtubeVideos = [];
    videos.forEach((element) => {
      let obj = {
        videoURL: `https://www.youtube.com/watch?v=${element.snippet.resourceId.videoId}`,
      };
      youtubeVideos.push(obj);
    });
    // sending video array back to the user
    console.log("Sending videos array to the user");
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
