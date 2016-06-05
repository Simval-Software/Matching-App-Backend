'use strict';

let userRouter = require('express').Router(),
    userCtrl = require('./user.controllers');

userRouter.get('/', userCtrl.getAllUsers);

module.exports = userRouter;