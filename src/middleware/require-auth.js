const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../errors/custom-error');

const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    throw new CustomError('not authorized');
  }

  next();
};

module.exports = { requireAuth };
