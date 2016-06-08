'use strict';

let userRouter = require('express').Router(),
    userCtrl = require('./user.controllers'),
    tokenAuth = require('../auth/auth');

userRouter.use(tokenAuth.decodeToken());
userRouter.get('/me', userCtrl.profileHandlers.getMyProfile);

module.exports = userRouter;