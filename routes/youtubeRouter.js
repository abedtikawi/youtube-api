const router = require("express").Router();
const isUser = require("../middlewares/users/validateJWT");
router.route("/").get(isUser, require("../controllers/youtube/userVideos"));
router.route("/:id").get(isUser,require("../controllers/youtube/videoDetails"))
module.exports = router;
