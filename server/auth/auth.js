'use strict';

let jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    config = require('../config/config'),
    checkToken = expressJwt({ secret: config.secrets.jwt });

exports.decodeToken = () => {
    return (req, res, next) => {
        // make it optional to place token on query string
        // if it is, place it on the headers where it should be
        // so checkToken can see it. See follow the 'Bearer 034930493' format
        // so checkToken can see it and decode it
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // this will call next if token is valid
        // and send error if its not. It will attached
        // the decoded token to req.user
        checkToken(req, res, next);
    };
};
exports.users = [
    { id: 1, email: 'abramgutan@abv.bg', password: '123' },
    { id: 2, email: 'topJoy@abv.bg', password: 'asd' }
]
exports.getFreshUser = () => {
    return (req, res, next) => {
        let [user] = exports.users.filter((user) => { return user.id === req.user.id });
        user = Object.assign(user, req.user);
        res.json(user);
        next();
    }
};

exports.assignToken = () => {
    return (req, res, next) => {
        let id = req.user.id;
        req.user.access_token = signToken(id);
        next();
    }
}

exports.verifyUser = () => {
    return (req, res, next) => {
        let {email, password} = req.body;

        if (email && password) {
            let [user] = exports.users.filter((user) => { return user.email === email; });

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
    };
};

let signToken = (id) => {
    return jwt.sign(
        { _id: id },
        config.secrets.jwt,
        { expiresIn: config.expireTime }
    );
};