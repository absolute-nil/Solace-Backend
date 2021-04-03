'use strict';

const express = require('express');
const { body } = require('express-validator');
const { CustomError } = require('../errors/custom-error');
const { Blog } = require('../models/blog');
const router = express.Router();
const { requireAuth } = require('../middleware/require-auth');

router.get('/', requireAuth, async (req, res) => {
  const blogs = await Blog.find({ author: req.currentUser.id });

  res.status(201).send(blogs);
});

module.exports = router;
