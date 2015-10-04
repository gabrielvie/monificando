'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');


exports.verify = function(req, res, next) {

	User.findById(req.params.user_id, function(err, user) {
		if (err) { res.status(501).send(err); return; }

		if (user) {
			next();
		} else {
			res.status(401).send({ success: false, message: 'User not found.' });
			return;
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
