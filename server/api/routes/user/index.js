'use strict';

let userRouter = require('express').Router(),
    userCtrl = require('./user.controllers'),
    tokenAuth = require('./../../../auth/auth');

userRouter.use(tokenAuth.decodeToken());
// userRouter.get('/', userCtrl.getAllUsers);

module.exports = userRouter;