'use strict';
let authRouter = require('express').Router(),
    controller = require('./controller'),
    auth = require('./auth');

// before we send back a jwt, lets check
// the password and username match what is in the DB
authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);
authRouter.use(auth.assignToken());

module.exports = authRouter;