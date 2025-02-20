const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Blog = require('../models/blogModel');

dotenv.config({ path: './config.env' });

// When using local database.
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

// When using ATLAS
// const DB = process.env.DATABASE_ATLAS.replace(
//   '<db_password>',
//   process.env.DATABASE_PASSWORD_ATLAS,
// );

// mongoose.connect(DB).then(() => console.log('DB connection successfull'));

// READ JSON FILE
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/blogs.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await User.create(users, { validateBeforeSave: false });
    await Blog.create(blogs);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    // will delete all of the documents in a certain collection
    // await User.deleteMany();
    await Blog.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// How to run the above script?
// To delete all data
// node dev-data/data/import-dev-data.js --delete
// To import all data
// node dev-data/data/import-dev-data.js --import

// Here, '--import' and '--delete' will be a part of 'process.argv'
