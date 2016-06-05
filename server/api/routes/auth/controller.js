'use strict';

let authMware = require('./auth'),
	userQueries = require('./../user/user.controllers/').user;

module.exports = {
	login(req, res, next) {
		let {email, password} = req.body;

        if (email && password) {

            if (user && user.password === password) {
                req.user = {
                    id: user.id
                };
                next();
            } else {
                res.statusCode = 404;
                next(new Error('Invalid username or password'));
            }
        } else {
            res.statusCode = 400;
            next(new Error('Please provide username and password'));
        }
	},
	register(req, res, next) {
		let {email, password, confirmPass} = req.body;

		if (password === confirmPass) {
			userQueries.addUser({ email, password }).then((user) => {
				req.user = user._doc;
				next();
			}).catch((err) => {
				res.statusCode = 200;
				next(new Error('Email already taken!'));
			});
		} else {
			res.statusCode = 400;
			next(new Error('Passwords do not match'));
		}
	}
}