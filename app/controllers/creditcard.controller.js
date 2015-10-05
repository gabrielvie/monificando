'use strict';

var mongoose 	= require('mongoose'),
	User 	 	= mongoose.model('User'),
	CreditCard	= mongoose.model('CreditCard');

exports.save = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var nCreditCard = new CreditCard(req.body);

		user.credit_cards.push(nCreditCard);
		var cc_id = nCreditCard._id;

		user.save(function(err, savedUser) {
			if (err) { res.status(501).send(err); return; }

			var createdCreditCard = savedUser.credit_cards.id(cc_id);

			res.status(201).send({
				success: true,
				data: createdCreditCard
			});
		});
	});
};


exports.get = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var creditCard = user.credit_cards.id(req.params.creditcard_id);

		if (creditCard) {
			res.status(200).send({ success: true, data: creditCard });
		} else {
			res.status(404).send({ success: false, err: 'Credit Card not found.' });
		}
	});
};


exports.list = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		res.status(200).send({ success: true, list: user.credit_cards });
	});
};


exports.update = function(req, res) {

	var uCreditCard = req.body,
		conditions = {
			'_id': req.params.user_id,
			'credit_cards': {
				'_id': req.params.creditcard_id
			}
		};

	User.findOneAndUpdate(conditions, uCreditCard, function(err, user){
		if (err) { res.status(404).send(err); return; }

		uCreditCard = user.credit_cards.id(req.params.creditcard_id);

		res.status(200).send(result);
	});
};


exports.delete = function(req, res) {

	var userId = req.params.user_id;

	User.findById(userId, function(err, user) {
		if (err) { res.status(304).send(err); return; }

		user.credit_cards.id(req.params.creditcard_id).remove();

		user.save(function(err, user) {
			if (err) { res.status(304).send(err); return; }

			res.status(200).send({ deleted: true });
		});
	});
};
