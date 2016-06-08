'use strict';

let authMware = require('./auth'),
	userQueries = require('./../user/user.controllers/').queries;

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
		let { email, password, confirmPass, firstName, lastName, gender, city, country, dateOfBirth } = req.body;

		if (password === confirmPass) {
			userQueries.addUser({ email, password, firstName, lastName, gender, city, country, dateOfBirth }).then((user) => {
				req.user = user._doc;
				next();
			}).catch((err) => {
				next(new Error(err));
			});
		} else {
			next(new Error('Passwords do not match!'));
		}
	}
}