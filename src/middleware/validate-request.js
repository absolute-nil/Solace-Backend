const { validationResult } = require('express-validator');
const { CustomError } = require('../errors/custom-error');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new CustomError('validation failed');
  }

  next();
};

module.exports = { validateRequest };
