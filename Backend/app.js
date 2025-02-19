const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Below middleware is used to parse the data from the cookie
app.use(cookieParser());

// Below is used so that our server can set cookies properly for frontend
// app.use(
//   cors({
//     origin: 'http://127.0.0.1:5173', // our frontend url
//     methods: 'GET,POST,PUT,DELETE', // allow all methods
//     credentials: true,
//   }),
// );

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5173/createNewBlog',
  'http://localhost:5173/search',
  'http://localhost:5173/signup',
  'http://localhost:5173/login',
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }),
);

// Below two middlewares are used to read 'req.body'
app.use(
  express.json({
    limit: '10kb',
  }),
);

// This one is specially made for HTML forms.
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
