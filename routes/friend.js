const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend_controller');

router.get('/create/:id', friendController.create);

module.exports = router;