'use strict';

let jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    config = require('../../../config/config'),
    checkToken = expressJwt({ secret: config.secrets.jwt });

exports.decodeToken = () => {
    return (req, res, next) => {
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        checkToken(req, res, next);
    };
};

exports.assignToken = () => {
    return (req, res, next) => {
        req.user.access_token = signToken(req.user._id);
        res.json(req.user);
    }
}

exports.verifyUser = () => {
    return (req, res, next) => {
        let {email, password} = req.body;

        if (email && password) {
            // check if there`s such a user and return it

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