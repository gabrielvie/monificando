'use strict';

var mongoose 	= require('mongoose'),
	User 		= mongoose.model('User'),
	Bill		= mongoose.model('Bill');

exports.save = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var nBill = new Bill({
			description: req.body.description,
			total: req.body.total,
			payment: {
				payment_type: req.body.payment_options,
				reference: req.body.payment_ref
			},
			repeat: req.body.repeat
		});

		nBill.values = nBill.valuesTrait(req.body.repeat, req.body.total, req.body.qty);

		user.bills.push(nBill);

		user.save(function(err, savedUser) {
			if (err) { res.status(501).send(err); return; }

			res.status(201).send({ success: true });
		});
	});
};


exports.get = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var bill = user.bills.id(req.params.bill_id);
		
		if (bill) {
			res.status(200).send({ success: true, data: bill });
		} else {
			res.status(404).send({ success: false, err: 'Bill not found.' });
		}
	});
};


exports.list = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			console.log('err || !user');
			res.status(404).send({ success: false, err: err });
			return;
		}

		res.status(200).send({ success: true, list: user.bills });		
	});
};


exports.update = function(req, res) {

};


exports.delete = function(req, res) {

};


