'use strict';

const express = require('express');
const { body } = require('express-validator');
const { CustomError } = require('../errors/custom-error');
const { Blog } = require('../models/blog');
const router = express.Router();
const { requireAuth } = require('../middleware/require-auth');

router.patch('/:blogId', requireAuth, async (req, res) => {
  const blogs = await Blog.findById(req.query.blogId);

  blogs.set('likes', blogs.get('likes') + 1);

  await blogs.save();

  res.status(201).send(blogs);
});

module.exports = router;
