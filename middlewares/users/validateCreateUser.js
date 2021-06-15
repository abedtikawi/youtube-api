const { check } = require("express-validator");
module.exports = [
  check("fullName","please insert a fullName").not().isEmpty().isLength({ min: 6 }),
  check("channelID","please insert a channelID").not().isEmpty(),
  check("email").isEmail().withMessage("please insert a valid email format"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("please insert a valid password"),
];
