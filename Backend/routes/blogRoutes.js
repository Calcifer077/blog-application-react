const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use('/search', blogController.searchBlog);

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authController.protect, blogController.createBlog);

router.use(authController.protect);

router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
