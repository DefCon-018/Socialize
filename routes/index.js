const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/api', require('./api'));
router.use('/like', require('./like'));
router.use('/friend', require('./friend'));
router.use('/message', require('./message'));
router.use('/auth', require('./auth'));

module.exports = router;