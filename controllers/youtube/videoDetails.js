const axios = require('axios');
/**
 * @api {get} /:id Get User videos details
 * @apiName VideoDetails
 * @apiGroup Users
 * @apiParams {String} id videoID
 * @apiHeader {json} token Authorization value.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "Bearer token"
 *     }
 * @apiSuccess {Object} api Videos Object
 */
module.exports = async (req, res) => {
  try {
    console.log('In in videoDetails.js')
    // Create headers and send request to get video details
    const headers = {
      Accept: 'application/json',
    };
    console.log(
      `-- Requesting the youtube api to find the Youtube Video with id ${req.params.id}`
    );
    const videoQuery = {
      part: 'snippet,contentDetails,statistics',
      id: `${req.params.id}`,
      key: `${process.env.CLIENT_API_KEY}`,
    };
    const getVideoDetails = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos`,
      { params: videoQuery },
      headers
    );

    // handle non youtube videos
    if (getVideoDetails.data.pageInfo.totalResults === 0) {
      console.log('This video does not exist on youtube');
      return res
        .status(400)
        .json({ message: 'This video does not exist on Youtube ' });
    }
    console.log('-- Video found');
    console.log('-- Formatting video Object');
    // save the video data details found in the items array at index 0
    const fullVideoObject = getVideoDetails.data.items[0];

    const videoDetails = {
      videoID: fullVideoObject.id,
      videoTitle: fullVideoObject.snippet.title,
      videoDescription: fullVideoObject.snippet.description,
      channelID: fullVideoObject.snippet.channelId,
      channelTitle: fullVideoObject.snippet.channelTitle,
      videoDuration: fullVideoObject.contentDetails.duration,
      isLicensed: fullVideoObject.contentDetails.videoLicensed,
      videoCaption: fullVideoObject.contentDetails.caption,
      viewCount: fullVideoObject.statistics.viewCount,
      likes: fullVideoObject.statistics.likeCount,
      dislikes: fullVideoObject.statistics.dislikeCount,
      commentCount: fullVideoObject.statistics.commentCount,
    };
    console.log('-- Sending videos array to the user');
    return res.status(200).json({
      message: 'Success',
      api: videoDetails,
    });
  } catch (error) {
    console.log('-- Error in videoDetails.js');
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
