'use strict';

let authMware = require('./auth');

var users = authMware.users;

module.exports = {
	login(req, res, next) {
		authMware.verifyUser()(req, res, next);
	},
	register(req, res, next) {
		let {email, password, confirmPass} = req.body;

		if (users.some((user) => { return user.email === email })) {
			next(new Error('User with this email already exists'));
		} else {
			if (password !== confirmPass) {
				res.statusCode = 400;
				next(new Error('Passwords do not match'));
			} else {
				// Add the user to the database
				req.user = { id: id };
				next();
			}
		}
	}
}