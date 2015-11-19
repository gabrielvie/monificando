'use strict';

var mongoose 	= require('mongoose')
  , moment		= require('moment')
  , User 		= mongoose.model('User')
  , Bill		= mongoose.model('Bill')
  , Tags 		= mongoose.model('Tags');

exports.save = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var request = req.body;

		var nBill = new Bill({
				description: request.description,
				payment: {
					form: request.payment_form,
					reference: user.credit_cards.id(request.payment_ref)
				},
				period: request.period === null ? '' : request.period,
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

		bill.tags.forEach(function(tagId, index) {
			bill.tags[index] = user.tags.id(tagId);
		});

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

		var bills 					= [],
			addToBillsCollection	= function(item, index) {
				var finalBill 	= item.toObject()
				  , sufixDesc 	= '';

				finalBill.attacheds = [];

				if (finalBill.values.length > 1) {
					sufixDesc = (" " + (index + 1) + ("/" + finalBill.values.length));
					finalBill.description = finalBill.description + sufixDesc;
				}

				finalBill.tags.forEach(function(tagId, index) {
					finalBill.tags[index] = user.tags.id(tagId);
				});

				finalBill.value = finalBill.values[index].value;
				finalBill.date  = finalBill.values[index].date;

				delete finalBill.values;

				return finalBill;
			};

		user.bills.forEach(function(bill, idx) {

			bill.values.forEach(function(value, idx) {

				var startDate 	= moment().startOf('month')
				  , endDate		= moment().endOf('month')
				  , editedBill	= {};

				if ( moment(value.date).isBetween(startDate, endDate) && bill.payment.form !== 'credit') {

					editedBill = addToBillsCollection(bill, idx);

					bills.push(editedBill);
				}

				if (bill.payment.form === 'credit') {

					var creditCard 				= user.credit_cards.id(bill.payment.reference)
					  , creditCardBill 			= {}
					  , creditCardBillExists 	= false;

					endDate 	= moment().date(creditCard.buy_day);
					startDate	= moment(startDate).subtract(1, 'months').add(1, 'days');

					if ( moment(value.date).isBetween(startDate, endDate) ) {

						editedBill = addToBillsCollection(bill, idx);

						bills.forEach(function(item, idx) {

							if (item._id === creditCard._id) {
								creditCardBillExists = true;
								creditCardBill = item;
							}

						});

						if (!creditCardBillExists) {

							creditCardBill._id = creditCard._id;
							creditCardBill.description = creditCard.description + ' ' + creditCard.payment_day + '/' + (moment().month() + 1);
							creditCardBill.date = endDate.date(creditCard.payment_day).toDate();
							creditCardBill.value = editedBill.value;
							creditCardBill.attacheds = [];

							bills.push(creditCardBill);

						} else {

							creditCardBill.value += editedBill.value;

						}

						creditCardBill.attacheds.push(editedBill);

						creditCardBill.attacheds.sort(function(a, b) {

							var dateA = moment(a.date)
							  ,	dateB = moment(b.date);

							return dateA.isBefore(dateB) ? true : false;
						});
					}
				}
			});

		});

		bills.sort(function(a, b) {

			var dateA = moment(a.date)
			,	dateB = moment(b.date);

			return dateA.isBefore(dateB) ? true : false;
		});

		//console.log(bills);

		res.status(200).send({ success: true, list: bills });
	});
};


exports.update = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var bill 	= user.bills.id(req.params.bill_id)
		  , index   = user.bills.indexOf(bill)
		  , to_set	= {}
		  , objBill	= new Bill(bill);

		req.body.values = objBill.onUpdateValue({
			value: req.body.value,
			date: req.body.date
		});

		req.body.payment = {
			form: req.body.payment_form,
			reference: req.body.payment_ref
		};

		delete req.body.value;
		delete req.body.date;
		delete req.body.payment_ref;
		delete req.body.payment_form;

		for (var field in req.body) {
			to_set['bills.' + index + '.' + field] = req.body[field];
		}

		user.set(to_set);

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


