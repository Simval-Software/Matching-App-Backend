'use strict';
let router = require('express').Router(),
    controller = require('./controller'),
    auth = require('./auth');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/login', controller.login);
router.post('/register', controller.register);
router.use(auth.assignToken());
router.use(auth.getFreshUser());

module.exports = router;