'use strict';

var mongoose 	= require('mongoose'),
	User 		= mongoose.model('User'),
	Bill		= mongoose.model('Bill'),
	Tags 		= mongoose.model('Tags');

exports.save = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var request = req.body,
			nBill = new Bill({
				description: request.description,
				payment: {
					payment_type: request.payment_options,
					reference: request.payment_ref
				},
				period: request.period,
				repeat: request.repeat,
				values: [],
				tags: []
			});

		nBill.onCreateValue({
			value: 	request.value,
			date:	request.date,
			qty:	request.qty
		});


		if (request.tags !== undefined) {
			nBill.tags = req.body.tags;
		}

		user.bills.push(nBill);

		user.save(function(err, savedUser) {
			if (err) { res.status(501).send(err); return; }

			res.status(201).send({
				success: true,
				data: nBill
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
			res.status(404).send({ success: false, err: err });
			return;
		}

		var bills = [];

		user.bills.forEach(function(bill, idx) {

			bill.values.forEach(function(value, idx) {
				var currentMonth = new Date().getMonth();

				if (currentMonth === value.date.getMonth()) {
					bills.push(bill);
				}
			});

		});

		res.status(200).send({ success: true, list: bills });
	});
};


exports.update = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		user.bills.forEach(function(bill, idx) {
			if (bill._id == req.params.bill_id) {
				var to_set = {},
					oBill = new Bill(user.bills.id(req.params.bill_id));

				req.body.values = oBill.onUpdateValue({
					value: req.body.value,
					date: req.body.date,
					before: req.body.before
				});

				delete req.body.value;
				delete req.body.date;

				for(var field in req.body) {
					to_set['bills.' + idx + '.' + field] = req.body[field];
				}

				user.set(to_set);
			}
		});

		user.save(function(err, user) {
			if (err) {
				res.status(304).send({ success: false, err: err });
				return;
			}

			res.status(200).send({ success: true, data: user.bills.id(req.params.bill_id) });
		});
	});
};


exports.delete = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err) { res.status(404).send(err); return; }

		user.bills.id(req.params.bill_id).remove();

		user.save(function(err, user) {
			if (err) { res.status(304).send(err); return; }

			res.status(200).send({ deleted: true });
		});
	});
};


