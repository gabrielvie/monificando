'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.save = function(req, res) {

	User.findOne({ email: req.body.email }, function(err, data){
		if (!data) {

			var newUser = new User({
				email: req.body.email,
				password: req.body.password,
				data: {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					birthday: req.body.birthday,
					gender: req.body.gender
				}
			});

			newUser.save(function(err) {
				if (err) {
					res.status(422).send({
						message: err.message,
						errors: err.errors
					});

					return;
				}

				return res.status(201).send({ success: true });
			});

		} else {
			return res.status(409).send({ message: 'Email has already in use.' });
		}
	});

};


exports.get = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err) { res.status(501).send(err); return; }

		if (user) {
			res.status(200).send({ success: true, data: user });
		} else {
			res.status(401).send({ success: false, message: 'User not found.' });
		}
	});

};


exports.update = function(req, res) {

};


exports.delete = function(req, res) {

	User.remove({ _id: req.params.user_id  }, function(err, user) {
		if (err) { res.status(304).send(err); return; }

		res.status(200).send({ deleted: true });
	});
};
