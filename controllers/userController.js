const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Room = require('../models/room');

// get all users
exports.users_list = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).populate('rooms', 'name').exec();
  res.json({ users: users });
});

// get specific user with an id
exports.user_detail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).populate('rooms', 'name').exec();
  if (user) {
    res.json({ user: user });
  } else { // not exist
    res.status(404).json({ errors: 'user not found' });
  }
});

// create user
exports.user_create_post = [
  // Validate and sanitize fields.
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.'),
  body('family_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  // then process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // create user after check
    const user = new User({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        new_user: user,
        errors: errors.array(),
      });
    } else {
      await user.save();
      return res.json({ message: 'Success' });
    }
  }),
];

// update specific user with an id
exports.user_update_post = [
  // Validate and sanitize fields.
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.'),
  body('family_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  // then process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // create user after check
    const user = new User({
      _id: req.params.id,
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        updated_user: user,
        errors: errors.array(),
      });
    } else {
      const isExist = await User.findById(req.params.id).exec();
      if (isExist) {
        await User.findByIdAndUpdate(req.params.id, user, {});
        return res.json({ message: 'Success' });
      } else {
        return res.status(400).json({
          errors: 'user not exist',
        });
      }
    }
  }),
];

// remove specific user with an id
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).populate('rooms', 'creator users').exec();
  if (user) {
    const rooms = user.rooms;
    const promises = [];
    rooms.forEach((room) => {
      if (room.creator.toString() === req.params.id) {
        if (room.users.length) {
          // he is the creator and there's users
          // make room.users[0] is the room creator
          // remove room.user[0]
          promises.push(Room.updateOne({ _id: room._id }, {
            $set: { creator: room.users[0].toString() },
            $pull: { users: room.users[0].toString() },
          }));
        } else {
          // he is the creator and there's no users
          // remove room
          promises.push(Room.deleteOne({ _id: room._id }));
        }
      } else {
        // he is user
        // remove the user in room.users
        promises.push(Room.updateOne({ _id: room._id }, {
          $pull: { users: req.params.id },
        }));
      }
    });
    // remove the user
    promises.push(User.deleteOne({ _id: req.params.id }));

    await Promise.all(promises);
    return res.json({ message: 'Success' });
  } else {
    return res.status(404).json({ errors: 'user not exist' });
  }
});
