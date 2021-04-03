const { Request, Response, NextFunction } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const currentUser = async (req, res, next) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    const user = await User.findById(payload.id);
    req.currentUser = user;
  } catch (e) {}

  next();
};

module.exports = { currentUser };
