const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog must have a title'],
  },
  content: {
    type: String,
    required: [true, 'A blog must have a content'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A blog must belong to a user'],
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
