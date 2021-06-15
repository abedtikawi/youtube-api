const { validationResult } = require("express-validator");

module.exports = (req, res) => {
  // create handler for erros
  const errors = validationResult(req);

  // handle return of errors with status code 400
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
};
