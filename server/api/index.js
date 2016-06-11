'use strict';

let apiRouter = require('express').Router();

apiRouter.use('/', require('./auth'));
apiRouter.use('/users', require('./user'));

module.exports = apiRouter;
