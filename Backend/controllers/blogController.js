const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find();

  console.log('route for all blogs hit');
  res.status(200).json({
    status: 'success',
    data: {
      blogs,
    },
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  console.log('route for a blog hit');

  const blog = await Blog.findById(req.params.id.slice(1));

  if (!req.user._id.equals(blog.user)) {
    return next(new AppError('You are not authorized to do this action!', 404));
  }

  if (!blog) {
    res.status(400).json({
      status: 'error',
      data: 'No blog found with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    blog,
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const blogBody = {
    user: req.user._id,
    ...req.body,
  };

  // Find the user that wants to create the blog and add it to his blogs.
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('No user found with this ID', 404));
  }

  const newBlog = await Blog.create(blogBody);

  if (!newBlog) {
    return next(new AppError('Something went wrong', 404));
  }

  const updatedUserBody = {
    blogs: [...user.blogs, newBlog._id],
  };

  // Update user
  await User.findByIdAndUpdate(req.user._id, updatedUserBody);

  res.status(201).json({
    status: 'success',
    newBlog,
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const id = req.params.id.slice(1);
  const blog = await Blog.findById(id);

  // If the one that wants to update it 'req.user._id' is different from 'blog.user' then don't allow to do so.
  if (!req.user._id.equals(blog.user)) {
    return next(new AppError(`You can't update this blog`, 404));
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    return next(
      new AppError('Something went wrong while updating your blog.', 404),
    );
  }

  res.status(200).json({
    status: 'success',
    data: updatedBlog,
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id.slice(1));
  console.log(blog);
  console.log(req.user);

  if (!req.user._id.equals(blog.user)) {
    return next(new AppError(`You can't delete this blog`, 404));
  }

  const deletedBlog = await Blog.findByIdAndDelete(req.params.id.slice(1));

  res.status(200).json({
    status: 'success',
    data: deletedBlog,
  });
});
