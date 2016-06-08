'use strict';

let authMware = require('./auth'),
	userQueries = require('./../user/user.controllers/').user;

module.exports = {
	login(req, res, next) {
		let {email, password} = req.body,
			invalidPasswordMsg = 'Invalid username or password';

        if (email && password) {
			userQueries.verifyUser(email, password).then((user) => {
				if (user) {
					req.user = user._doc;
					next();
				} else {
					next(new Error(invalidPasswordMsg));
				}
			});
        } else {
			next(new Error(invalidPasswordMsg));
        }
	},
	register(req, res, next) {
		let {email, password, confirmPass} = req.body;

		if (password === confirmPass) {
			userQueries.addUser({ email, password }).then((user) => {
				req.user = user._doc;
				next();
			}).catch((err) => {
				next(new Error('Email already taken!'));
			});
		} else {
			next(new Error('Passwords do not match!'));
		}
	}
}