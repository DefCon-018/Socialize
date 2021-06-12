const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message_controller');

router.get('/create', messageController.create);
router.get('/get-messages', messageController.getMessages);

module.exports = router;