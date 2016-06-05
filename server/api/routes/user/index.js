'use strict';

let userRouter = require('express').Router(),
    userCtrl = require('./user.controllers');

userRouter.get('/', userCtrl.auth.login);

module.exports = userRouter;