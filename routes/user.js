const express = require('express');
const router = express.Router();

// get all users
router.get('/', function (req, res, next) {
  res.send('respond with all users');
});

// get specific user with an id
router.get('/:id', function (req, res, next) {
  res.send('respond with a user ' + req.params.id + ' details');
});

// create user
router.post('/create', function (req, res, next) {
  res.send('to implement...');
});

// update specific user with an id
router.put('/update/:id', function (req, res, next) {
  res.send('to implement...');
});

// remove specific user with an id
router.delete('/remove/:id', function (req, res, next) {
  res.send('to implement...');
});

module.exports = router;
