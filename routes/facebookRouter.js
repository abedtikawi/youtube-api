const router = require("express").Router();

router.route("/me").post(require("../controllers/facebook/getUserDetails"));

module.exports = router;
