const asyncHandler = require('express-async-handler');

// get all users
exports.users_list = asyncHandler(async (req, res, next) => {
  res.send('respond with all users');
});

// get specific user with an id
exports.user_detail = asyncHandler(async (req, res, next) => {
  res.send('respond with a user ' + req.params.id + ' details');
});

// create user
exports.user_create_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});

// update specific user with an id
exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});

// remove specific user with an id
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});
