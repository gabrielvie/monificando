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
			res.status(401).send({ 'message' : 'User not found.' }); return;
		}

		var isMatch = user.authenticate(req.body.password);

		if (isMatch) {

			user.token = jwt.sign(user.updated_at, config.jwt.secret_token, { expiresIn: 60 });

			user.save(function(err, user) {

				res.status(200).send({
					success: true,
					user: {
						_id: user._id,
						first_name: user.data.first_name,
						last_name: user.data.last_name,
						email: user.data.email,
						updated_at: user.updated_at,
						token: user.token
					}
				});
			})
		} else {
			res.status(401).send({ 'message': 'Authentication failed. Email/Password' })
			return;
		}
	});
};

exports.signout = function(req, res) {

};
