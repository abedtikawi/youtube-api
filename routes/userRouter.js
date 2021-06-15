const router = require("express").Router();

router.route('/register').post(require('../middlewares/users/validateCreateUser'),require('../controllers/users/createUser'))
router.route('/login').post(require('../controllers/users/loginUser'))

module.exports = router;
