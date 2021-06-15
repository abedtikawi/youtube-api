const { check } = require("express-validator");
module.exports = [
  check("fullName")
    .isAlpha()
    .withMessage("fullName be only alphabetical chars")
    .isLength({ min: 6 }),
  check("email").isEmail().withMessage("please insert a valid email format"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("please insert a valid password"),
];
