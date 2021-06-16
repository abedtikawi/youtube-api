const { check } = require("express-validator");
module.exports = [
  check("fullName","please insert a fullName").not().isEmpty().isLength({ min: 6 }),
  check("youtube_channel_id","please insert a youtube_channel_id").not().isEmpty(),
  check("email").isEmail().withMessage("please insert a valid email format"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("please insert a valid password"),
];
