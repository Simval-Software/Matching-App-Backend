'use strict';

let userRouter = require('express').Router(),
    userCtrl = require('./user.controller');

userRouter.get('/', userCtrl.getAllUsers);

module.exports = userRouter;