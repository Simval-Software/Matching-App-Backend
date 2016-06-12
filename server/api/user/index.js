'use strict';

let userRouter = require('express').Router(),
    userCtrl = require('./user.controllers'),
    tokenAuth = require('../auth/auth');

userRouter.use(tokenAuth.decodeToken());
userRouter.route('/me')
    .get(userCtrl.profileHandlers.getMyProfile)
    .put(userCtrl.profileHandlers.editMyProfile);

module.exports = userRouter;