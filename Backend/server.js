const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('DB connection successful'));

const DB = process.env.DATABASE_ATLAS.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD_ATLAS,
);

mongoose.connect(DB).then(() => console.log('DB connection successfull'));

const port = process.env.PORT || 3002;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
