'use strict';

var mongoose 	= require('mongoose')
  , moment		= require('moment')
  , User 		= mongoose.model('User')
  , Bill		= mongoose.model('Bill')
  , Tags 		= mongoose.model('Tags');

var searchByDate = function(user, start, end) {

	var finalCollection = []
	  ,	addToCollection = function(item, index) {
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

	user.bills.forEach(function(item) {

	  	item.values.forEach(function(value, index) {

	  		var editedItem = {};

	  		if ( moment(value.date).isBetween(start, end) && item.payment.form !== 'credit' ) {

	  			editedItem = addToCollection(item, index);
	  			finalCollection.push(editedItem);

	  		}

	  		if (item.payment.form === 'credit') {
	  			var creditCard 				= user.credit_cards.id(item.payment.reference)
	  			  ,	creditCardBill 			= {}
	  			  ,	creditCardBillExists	= false;

	  			var endDate		= moment(end).date(creditCard.buy_day)
	  			  ,	startDate 	= moment(start).date(creditCard.buy_day).subtract(1, 'months').add(1, 'days');

	  			if ( moment(value.date).isBetween(startDate, endDate) ) {

	  				var valueDate 		= moment(value.date)
	  				  , dateDescription = moment(value.date).date() > creditCard.buy_day ? moment(value.date).month() + 2 : moment(value.date).month() + 1
	  				  , description 	= creditCard.description + ' ' + creditCard.payment_day + '/' + (dateDescription);

	  				editedItem = addToCollection(item, index);

	  				finalCollection.forEach(function(item, index) {

	  					if (item._id === creditCard._id && item.description === description) {
	  						creditCardBillExists = true;
	  						creditCardBill 		 = item;
	  					}

	  				});

	  				if (!creditCardBillExists) {

	  					creditCardBill._id 			= creditCard._id;
	  					creditCardBill.payment 		= { form: 'credit' };
	  					creditCardBill.description 	= description;
	  					creditCardBill.date 		= endDate.date(creditCard.payment_day).month(dateDescription - 1).toDate();
	  					creditCardBill.value 		= editedItem.value;
	  					creditCardBill.attacheds 	= [];

	  					finalCollection.push(creditCardBill);

	  				} else {

	  					creditCardBill.value += editedItem.value;

	  				}

	  				creditCardBill.attacheds.push(editedItem);

	  				creditCardBill.attacheds.sort(function(a, b) {

	  					var dateA = moment(a.date)
	  					  ,	dateB = moment(b.date);

	  					return dateA.isBefore(dateB) ? true : false;
	  				});

	  			}
	  		}

	  	});

	});

	finalCollection.sort(function(a, b) {

		var dateA = moment(a.date)
		,	dateB = moment(b.date);

		return dateA.isBefore(dateB) ? true : false;
	});

	return finalCollection;
};

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

		var billsCollection = []
		  ,	startDate		= moment().startOf('month').subtract(1, 'days')
		  , endDate			= moment().endOf('month').add(1, 'days');

		billsCollection = searchByDate(user, startDate, endDate);

		res.status(200).send({ success: true, list: billsCollection });
	});
};


exports.search = function(req, res) {

	var queries = req.query;

	if (queries.startDate === undefined) {

		res.status(404).send({ success: false, err: { message: 'No start date provided.' } });
		return;

	}

	if (!moment(queries.startDate).isValid()) {

		res.status(422).send({ success: false, err: { message: 'Invalid date.' } });
		return;

	}

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var	billsCollection = []
		  , startDate		= moment(queries.startDate)
		  ,	endDate			= queries.endDate !== undefined ? moment(queries.endDate) : moment();

		billsCollection = searchByDate(user, startDate, endDate);

		res.status(200).send({ success: true, list: billsCollection })
		return;
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


