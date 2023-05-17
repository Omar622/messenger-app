const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

// get all users
exports.users_list = asyncHandler(async (req, res, next) => {
  res.send('respond with all users');
});

// get specific user with an id
exports.user_detail = asyncHandler(async (req, res, next) => {
  res.send('respond with a user ' + req.params.id + ' details');
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
        errors: errors,
      });
    } else {
      await user.save();
      return res.json({ message: 'Success' });
    }
  }),
];

// update specific user with an id
exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});

// remove specific user with an id
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send('to implement...');
});
