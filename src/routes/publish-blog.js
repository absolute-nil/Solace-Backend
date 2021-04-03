'use strict';

const express = require('express');
const { body } = require('express-validator');
const { CustomError } = require('../errors/custom-error');
const { Blog } = require('../models/blog');
const router = express.Router();
const { validateRequest } = require('../middleware/validate-request');
const { requireAuth } = require('../middleware/require-auth');

router.post(
  '/',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('title must be valid'),
    body('status').not().isEmpty().withMessage('status must be present'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('description must be present'),
  ],
  validateRequest,
  async (req, res) => {
    const { title, status, body } = req.body;

    const blog = Blog.build({
      title,
      status,
      body,
      author: req.currentUser.id,
    });

    await blog.save();

    res.status(201).send(blog);
  }
);

module.exports = router;
