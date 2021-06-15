const { check } = require("express-validator");
module.exports = [
  check("fullName").not().isEmpty().isLength({ min: 6 }),
  check("email").isEmail().withMessage("please insert a valid email format"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("please insert a valid password"),
];
