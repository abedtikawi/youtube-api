const router = require("express").Router();

router.route("/me").post(require("../controllers/facebook/getUserDetails"));
router.route("/authenticate/facebook").post(require('../controllers/facebook/authenticateUser'))
module.exports = router;
