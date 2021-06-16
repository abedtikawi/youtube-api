const router = require("express").Router();

router.route("/me").get(require("../controllers/facebook/getUserDetails"));

// router.route("/authenticate").get(require('../controllers/facebook/authenticateUser'))

//handle successfull redirect and fail
// router.route("/authenticate/success").get(require('../controllers/facebook/authenticateUser'))
module.exports = router;
