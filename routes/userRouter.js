const router = require("express").Router();

router.route('/register').post(require('../middlewares/users/validateCreateUser'),require('../controllers/users/createUser'))


module.exports = router;
