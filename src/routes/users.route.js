const express = require('express');
const router = express.Router();
const passport = require('passport');
const registerController = require('../controllers/register.controller');
const { checkAuth } = require ('../controllers/checkAuth.controller');
const { defaultRender } = require('../utils/defaultValues');

// Registering and logging in
router.post('/register', registerController.registerUser);

router.get('/register', checkAuth, (req, res) => {
    defaultRender(req, res, false, '../public/views/register', {})
});

router.get('/login', checkAuth, (req, res) => {
    defaultRender(req, res, false, '../public/views/login', {})
});

// Logging out
router.get('/logout', (req, res, next) => {
    req.logout((/** @type {any} */ err) => {
        if (err) {
            return next(err)
        }
    });
    res.redirect('/');
})

// Passport Auth for logging in
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
}))

module.exports = router;