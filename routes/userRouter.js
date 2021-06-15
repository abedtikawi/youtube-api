const router = require("express").Router();
const isUser=require('../middlewares/users/validateJWT')
router.route('/register').post(require('../middlewares/users/validateCreateUser'),require('../controllers/users/createUser'))
router.route('/login').post(require('../middlewares/users/validateLoginUser'),require('../controllers/users/loginUser'))
router.route('/me').get(isUser,require('../controllers/users/findUser'))

module.exports = router;
