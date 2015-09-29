'use strict';

var mongoose 	= require('mongoose'),
	User 		= mongoose.model('User'),
	jwt			= require('jsonwebtoken'),
	config		= require('../../config/config');

exports.signin = function(req, res) {

	User.findOne({
		email: req.body.email
	}, function(err, user) {
		if (err) {
			return res.json(401);
		}

		if (user) {
			var isMatch = user.authenticate(req.body.password);

			if (!isMatch) {
				return res.status(401).send({'w':'password'});
			} else {
				var token = jwt.sign(user, config.jwt.secret_token, {
					expiresInMinutes: config.jwt.expires_in
				});

				return res.status(200).send({
					success: true,
					token: token,
					user: {
						'id': user._id,
						'email': user.email
					}
				});
			}
		} else {
			return res.status(401).send({'w':'email'});
		}
	});
};

exports.signup = function(req, res) {

	User.findOne({ email: req.body.email }, function(err, data){
		if (!data) {
			var newUser = new User(req.body);

			newUser.save(function(err) {
				if (err) {
					return res.status(422).send({
						message: err.message,
						errors: err.errors
					});
				}

				return res.status(201).send({ success: true });
			});

		} else {
			return res.status(409).send({ message: 'Email has already in use.' });
		}
	});

};

exports.signout = function(req, res) {

};
