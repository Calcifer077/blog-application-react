const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  // 1. Create token
  const token = signToken(user._id);

  // 2. Create cookie and send them using res
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true, // Prevent access via JavaScript
    secure: true, // Set to true in production (HTTPS)
    sameSite: 'none', // Required for cross-origin cookies
    partitioned: true,
  };

  console.log(token);
  res.cookie('jwt', token, cookieOptions);

  // 3. Reset user password for security
  user.password = undefined;

  // 4. Send toekn with user data
  res.status(statusCode).json({
    message: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // 1. Get required fields from body
  const email = req.body.email;
  const password = req.body.password;

  // 2. Check if both email and password are present in body
  if (!email || !password) {
    return next(new AppError('Please enter both fields', 401));
  }

  // 3. Find user using this email
  const user = await User.findOne({ email: email }).select('+password');

  // 4. Check if user exists and if it does check if the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 5. Create a token and send it
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  // 1. Reset the cookie
  res.cookie('jwt', 'loggedout');

  res.setHeader('authorization', ' ');

  // 2. Send response
  res.status(200).json({
    message: 'success',
    token: null,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // console.log(req.headers.authorization);

  // console.log(token);

  // 2. Check if token is present
  if (!token || token === String(null)) {
    return next(new AppError('You are not logged in. Please log in', 404));
  }

  // 3. Validate token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY,
  );

  const currentUser = await User.findById(decoded.id);

  // 4. Check if user still exists
  if (!currentUser) {
    return next(new AppError('No user found', 404));
  }

  // 5. Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password', 404));
  }

  // 6. Grant access to protected route
  req.user = currentUser;
  next();
});
