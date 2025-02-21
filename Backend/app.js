const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Below middleware is used to parse the data from the cookie
app.use(cookieParser());

const allowedOrigins = [
  'https://blog-application-react-delta.vercel.app',
  'https://blog-application-react-delta.vercel.app/createNewBlog',
  'https://blog-application-react-delta.vercel.app/search',
  'https://blog-application-react-delta.vercel.app/signup',
  'https://blog-application-react-delta.vercel.app/login',
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
