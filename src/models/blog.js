'use strict';
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: new Date(),
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.author;
      },
    },
  }
);

blogSchema.statics.build = (attrs) => {
  return new Blog(attrs);
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
