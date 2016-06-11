'use strict';

let router = require('express').Router();

router.use('/users', require('./user'));
router.use('/', require('./auth/routes'));

module.exports = router;

