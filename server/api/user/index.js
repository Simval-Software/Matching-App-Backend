'use strict';

let userRouter = require('express').Router(),
    userCtrl = require('./user.controllers'),
    tokenAuth = require('../auth/token');

userRouter.use(tokenAuth.decodeToken());
userRouter.route('/me')
    .get(userCtrl.profileCtrl.getMyProfile)
    .put(userCtrl.profileCtrl.editMyProfile);

userRouter.route('/me/matches')
    .put(userCtrl.matchesCtrl.likeUser)
    .get(userCtrl.matchesCtrl.getMyMatches);

module.exports = userRouter;