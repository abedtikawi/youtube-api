const router = require("express").Router();

router.route("/me").get(require("../controllers/facebook/getUserDetails"));








module.exports = router;



//authenticate the user to get access token , if success redirect to success or /me route to perform axios request
// router.route("/authenticate").get(require('../controllers/facebook/authenticateUser'))
//handle successfull redirect and fail
// router.route("/authenticate/success").get(require('../controllers/facebook/authenticateUser'))
