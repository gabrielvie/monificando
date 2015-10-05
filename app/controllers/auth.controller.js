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
			res.json(401); return;
		}

		if (user) {
			var isMatch = user.authenticate(req.body.password);

			if (!isMatch) {
				res.status(401).send({'w':'password'});
			} else {
				var token = jwt.sign(user, config.jwt.secret_token, {
					expiresInMinutes: config.jwt.expires_in
				});

				res.status(200).send({
					success: true,
					token: token,
					user: {
						_id: user.id,
						email: user.email
					}
				});
			}
		} else {
			res.status(401).send({'w':'email'});
		}
	});
};

exports.signout = function(req, res) {

};
