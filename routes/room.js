const express = require('express');
const router = express.Router();

// get all rooms
router.get('/', function (req, res, next) {
  res.send('respond with a all rooms');
});

// get specific room with an id
router.get('/:id', function (req, res, next) {
  res.send('respond with a room ' + req.params.id + ' details');
});

// create room
router.post('/create', function (req, res, next) {
  res.send('to implement...');
});

// update specific room with an id
router.put('/update/:id', function (req, res, next) {
  res.send('to implement...');
});

// remove specific room with an id
router.delete('/remove/:id', function (req, res, next) {
  res.send('to implement...');
});

module.exports = router;
