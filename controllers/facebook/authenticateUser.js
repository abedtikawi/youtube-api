const queryString = require("query-string");
module.exports = async (req, res) => {
  try {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.FACEBOOK_API_ID,
      redirect_uri: "https:localhost:5000/facebook/authenticate/success",
      scope: [
        "email",
        "user_friends",
        "id",
        "name",
        "email",
        "gender",
        "pictures",
        "likes",
      ].join(","),
      response_type: "code",
      auth_type: "rerequest",
      display: "popup",
    });

    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  } catch (error) {
    console.log("-- Error in fb authenticateUser.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
