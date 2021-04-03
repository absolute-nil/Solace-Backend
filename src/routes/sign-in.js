'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const { CustomError } = require('../errors/custom-error');
const { User } = require('../models/user');
const { Password } = require('../services/password');
const router = express.Router();
const { validateRequest } = require('../middleware/validate-request');

router.post(
  '/',
  [
    body('email').isEmail().withMessage('provide a valid email'),
    body('password').trim().notEmpty().withMessage('must supply an password'),
  ],
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new CustomError('Invalid Credentials');
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new CustomError('Invalid Credentials');
    }

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );

    // store it on session
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

module.exports = router;
