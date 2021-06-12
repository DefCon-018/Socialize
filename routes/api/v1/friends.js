const express = require('express');
const router = express.Router();
const friendApi = require('../../../controllers/api/v1/friend_api');

router.get('/create/:id', friendApi.create);
router.get('/destroy/:id', friendApi.destroy);

module.exports = router;