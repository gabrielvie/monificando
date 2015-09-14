'use strict';

var mongoose 	= require('mongoose'),
	User 		= mongoose.model('User'),
	jwt			= require('jsonwebtoken'),
	bcrypt		= require('bcrypt-nodejs'),
	config		= require('../../config/config');

exports.signin = function(req, res) {
	var email = req.body.email,
		passw = req.body.password,
		isMatch = false;

	User.findOne({
		email: req.body.email
	}, function(err, user) {
		if (err) {
			return res.json(401);
		}

		if (user) {
			var isMatch = user.verifyPassword(req.body.password);

			if (!isMatch) {
				console.log("Attempt failed to login with " + user.email);
				return res.send(401);
			} else {
				var token = jwt.sign(user, config.jwt.secret_token, {
					expiresInMinutes: config.jwt.expires_in
				});

				res.json({
					success: true,
					token: token
				});
			}
		} else {
			return res.json({
				success: false,
				message: 'Usuário não encontrado.'
			});
		}
	});
};

exports.signup = function(req, res) {

	var userInfo 	= req.body,
		data 		= {
			first_name: userInfo.first_name,
			last_name: userInfo.last_name,
			birthday: userInfo.birthday,
			gender: userInfo.gender
		};

	delete userInfo.first_name;
	delete userInfo.last_name;
	delete userInfo.birthday;
	delete userInfo.gender;

	userInfo.data = data;

	var user = new User(userInfo);

	user.save(function(err) {
		if (err) throw err;

		res.json({ success: true });
	});
};

exports.signout = function(req, res) {

};
