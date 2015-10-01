'use strict';

var jwt 	= require('jsonwebtoken'),
	config	= require('../../config/config'),
	_ 		= require('underscore');

module.exports = function(app) {
	app.use(function(req, res, next) {
		var token 			= req.param('token') || req.headers['token'],
			nonSecurePaths 	= ['/', '/api/signin', '/api/signup'];

		res.type('application/json');

		if (_.contains(nonSecurePaths, req.path)) return next();

		if (token) {
			jwt.verify(token, config.jwt.secret_token, function(err, decoded) {
				if (err) {
					res.status(401).send({ message: 'Failed to authenticate token.'});
				} else {
					req.decode = decoded;
					next();
				}
			});
		} else {
			res.status(401).send({ message: 'No token provided.' });
		}

		return;
	});
};