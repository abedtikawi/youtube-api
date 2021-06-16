const router = require("express").Router();
const isUser = require("../middlewares/users/validateJWT");
router.route("/").get(require("../controllers/youtube/userVideos"));

module.exports = router;
