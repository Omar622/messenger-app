const asyncHandler = require('express-async-handler');


// get all rooms
exports.rooms_list = asyncHandler(async (req, res, next) => {
  res.send('respond with a all rooms');
});

// get specific room with an id
exports.room_detail = asyncHandler(async (req, res, next) => {
  res.send('respond with a room ' + req.params.id + ' details');
});

// create room
exports.room_create_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});

// update specific room with an id
exports.room_update_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});

// remove specific room with an id
exports.room_delete_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});
