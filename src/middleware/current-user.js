const { Request, Response, NextFunction } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const currentUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next();
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(payload.id);
    req.currentUser = user;
  } catch (e) {}

  next();
};

module.exports = { currentUser };
