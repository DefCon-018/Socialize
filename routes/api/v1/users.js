const express = require('express');
const router = express.Router();
const passport = require('passport');

const userApi = require('../../../controllers/api/v1/users_api');
router.post('/create', userApi.createSession);

module.exports = router;