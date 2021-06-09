const express = require('express');
const router = express.Router();

const passport =  require('passport');
const userController = require('../controllers/user_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
        'local',
        {failureRedirect: '/user/sign-in'}
    ),
    userController.createSession
);

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/log-out', userController.destroySession);
router.get('/profile/:id', userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

module.exports = router;