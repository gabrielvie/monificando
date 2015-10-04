'use strict';

var mongoose 	= require('mongoose'),
	User 		= mongoose.model('User'),
	CreditCard	= mongoose.model('CreditCard');

exports.save = function(req, res) {

	var nCreditCard = null;

	User.findById(req.params.user_id, function (err, user) {
		if (err) { res.status(501).send(err); return; }

		req.body._user = user._id;

		nCreditCard = new CreditCard(req.body);

		nCreditCard.save(function (err, result){
			if (err) { res.status(501).send(err); return; }

			CreditCard
				.findById({ _id: result._id })
				.populate('_user')
				.exec(function (err){
					if (err) { res.status(501).send(err); return; }

					res.status(201).send({ success: true, data: result });
				});
		});
	});
};


exports.get = function(req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (err) { res.status(404).send(err); return; }

		CreditCard.findById(req.params.creditcard_id, function(err, result){
			if (err) { res.status(404).send(err); return; }

			if (result) {
				res.status(200).send({ success: true, data: result });
			} else {
				res.status(404).send({ success: false });
			}
		});
	});
};


exports.getall = function(req, res) {

	var userId = req.params.user_id;

	User.findById(userId, function (err, user) {
		if (err) { res.status(404).send(err); return; }

		CreditCard.find({ _user: userId }, function(err, creditCards){
			if (err) { res.status(404).send(err); return; }

			res.status(200).send({ success: true, list: creditCards });
		});
	});
};


exports.update = function(req, res) {

	var userId = req.params.user_id;

	User.findById(userId, function (err, user) {
		if (err) { res.status(404).send(err); return; }

		var uCreditCard = req.body;
		var conditions = {
			_user: userId,
			_id: req.params.creditcard_id
		};

		CreditCard.update(conditions, uCreditCard, { multi: false }, function(err, result){
			if (err) { res.status(404).send(err); return; }

			res.status(200).send(result);
		});
	});
};


exports.delete = function(req, res) {

	var userId = req.params.user_id;

	User.findById(userId, function (err, user) {
		if (err) { res.status(404).send(err); return; }

		CreditCard.remove({ _id: req.params.creditcard_id  }, function(err, deleted) {
			if (err) { res.status(304).send(err); return; }

			res.status(200).send({ deleted: true });
			return;
		});
	});
};
