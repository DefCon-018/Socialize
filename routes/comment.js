const express = require('express');
const passport = require('passport');
const router = express.Router();
const commentController = require('../controllers/comment_controller');

router.post('/create', passport.checkAuthentication, commentController.create);
router.get('/delete-comment/:id', commentController.destroy);

module.exports = router;