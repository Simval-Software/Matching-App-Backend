'use strict';
let router = require('express').Router(),
    controller = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/login', controller.login);

module.exports = router;
