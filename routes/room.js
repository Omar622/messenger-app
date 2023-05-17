const room_controller = require('../controllers/roomController');

const express = require('express');
const router = express.Router();

router.get('/', room_controller.rooms_list);

router.get('/:id', room_controller.room_detail);

router.post('/create', room_controller.room_create_post);

router.put('/update/:id', room_controller.room_update_post);

router.delete('/remove/:id', room_controller.room_delete_post);

module.exports = router;
