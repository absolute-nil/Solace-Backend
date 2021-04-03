const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { CustomError } = require('../errors/custom-error');
const { validateRequest } = require('../middleware/validate-request');

const router = express.Router();

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('name')
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('name must be between 4 and 20 character long'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 character long'),
  ],
  validateRequest,
  async (req, res) => {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new CustomError('Email already in use');
    }

    const user = User.build({
      email,
      password,
      name,
    });
    await user.save();

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY
    );

    user.set('token', userJwt);

    await user.save();
    res.status(201).send({ ...user.toJSON(), token: userJwt });
  }
);

module.exports = router;
