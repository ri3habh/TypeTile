const express = require('express');
const router = express.Router();
const asyncWrapper = require('../error-handling/asyncWrapper');
const passport = require('passport');
const { renderRegForm, renderLoginForm, register, loginMessage, logout } = require('../controllers/users');

router.get('/logout', logout);
// Register routes
router.route('/register')
    .get(renderRegForm)
    .post(asyncWrapper(register));
// Login routes
router.route('/login')
    .get(renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginMessage);

module.exports = router;