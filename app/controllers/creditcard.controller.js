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

		if (creditCard && creditCard.active) {
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

		for (var index = 0; index < user.credit_cards.length; index++) {
			if (!user.credit_cards[index].active) {
				delete user.credit_cards[index];
			}
		}

		res.status(200).send({ success: true, list: user.credit_cards });
	});
};


exports.update = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		user.credit_cards.forEach(function(cc, idx) {
			if (cc._id == req.params.creditcard_id) {
				var to_set = {};

				for(var field in req.body) {
					to_set['credit_cards.' + idx + '.' + field] = req.body[field];
				}

				user.set(to_set);
			}
		});

		user.save(function(err, user) {
			if (err) {
				res.status(304).send({ success: false, err: err });
				return;
			}

			res.status(200).send({ success: true, data: user.credit_cards.id(req.params.creditcard_id )});
		})
	});
};


exports.delete = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var billsCollection = user.bills
		  ,	del 			= true;

		User.find({ "bills.payment.reference": mongoose.Types.ObjectId(req.params.creditcard_id) }, {}, function(err, items) {

			if (items.length === 0) {

				user.credit_cards.id(req.params.creditcard_id).remove();

			} else {

				var credit 	= user.credit_cards.id(req.params.creditcard_id)
				  ,	indexOf = user.credit_cards.indexOf(credit)
				  ,	toSet 	= {};

				toSet['credit_cards.' + indexOf + '.active'] = false;

				user.set(toSet);

			}

			user.save(function(err, user) {
				if (err) { console.log(err); res.status(304).send({ err: err }); return; }

				res.status(200).send({ deleted: true });
			});

		});
	});
};
