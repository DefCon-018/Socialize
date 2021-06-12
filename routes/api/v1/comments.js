const express = require('express');
const router = express.Router();
const commentApi = require('../../../controllers/api/v1/comment_api');

router.post('/create', commentApi.create);
router.get('/destroy/:id', commentApi.destroy);

module.exports = router;