const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Room = require('../models/room');
const User = require('../models/user');

// get all rooms
exports.rooms_list = asyncHandler(async (req, res, next) => {
  const rooms = await Room.find({})
    .populate('creator', 'first_name family_name')
    .populate('users', 'first_name family_name').exec();
  res.json({ rooms: rooms });

});

// get specific room with an id
exports.room_detail = asyncHandler(async (req, res, next) => {
  const room = await Room.findOne({ _id: req.params.id })
    .populate('creator', 'first_name family_name')
    .populate('users', 'first_name family_name').exec();
  if (room) {
    res.json({ room: room });
  } else { // not exist
    res.status(404).json({ errors: 'room not found' });
  }
});

// create room (need room name and creator id)
exports.room_create_post = [
  // Validate and sanitize fields.
  body('name')
    .isLength({ min: 1 })
    .escape()
    .withMessage('name must be specified.'),
  body('creator')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('creator name must be specified.'),
  // then process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // create room after check
    const room = new Room({
      name: req.body.name,
      creator: req.body.creator,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        new_room: room,
        errors: errors.array(),
      });
    } else {
      await room.save();
      await User.findByIdAndUpdate(req.body.creator, { $push: { rooms: room._id } });
      return res.json({ message: 'Success' });
    }
  }),
];

// update specific room with an id
exports.room_update_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});

// remove specific room with an id
exports.room_delete_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});
