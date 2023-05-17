const user_controller = require('../controllers/userController');

const express = require('express');
const router = express.Router();

router.get('/', user_controller.users_list);

router.get('/:id', user_controller.user_detail);

router.post('/create', user_controller.user_create_post);

router.put('/update/:id', user_controller.user_update_post);

router.delete('/remove/:id', user_controller.user_delete_post);

module.exports = router;
