'use strict';

let apiRouter = require('express').Router();

apiRouter.use('/users', require('./user'));
apiRouter.use('/', require('./auth'));

module.exports = apiRouter;
