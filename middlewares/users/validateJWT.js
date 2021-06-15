const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // save token in a variable
  let token = req.headers["authorization"];
  //  check if token exists
  if (!token) {
    // return with a 401 error status code
    return res.status(401).json({
      status: "error",
      data: {
        message: "Not authenticated",
      },
    });
  }

  //If authorization starts with a prefix of 'Bearer'
  if (token.startsWith("Bearer")) {
    // Remove the word Bearer and override the previous variable token with the value
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    // Verify that the token is authentic with respect to the access secret in the .env vars
    let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    // retrieve from the decoded Token the object user and save it in the request as req.user
    req.user = decodedToken.user;
    // move from the middleware and return to the controller
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      data: {
        message: "Invalid Token",
      },
    });
  }
};
