const express = require('express');
const router = express.Router();
const asyncWrapper = require('../error-handling/asyncWrapper');
const passport = require('passport');
const { renderRegForm, renderLoginForm, register, loginMessage, logout, updateUser, renderProfilePage } = require('../controllers/users');
const { isLoggedIn } = require('../middleware');

router.get('/logout', logout);
// Register routes
router.route('/register')
    .get(renderRegForm)
    .post(asyncWrapper(register));
// Login routes
router.route('/login')
    .get(renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginMessage);
// CRUD routes
router.route('/:id')
    .get(renderProfilePage)
    .post(isLoggedIn, asyncWrapper(updateUser));

// Exports
module.exports = router;