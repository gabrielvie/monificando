'use strict';

var mongoose 	= require('mongoose'),
	User 		= mongoose.model('User'),
	CreditCard	= mongoose.model('CreditCard');

exports.save = function(req, res) {

	var nCreditCard = null;

	User.findById(req.params.user_id, function (err, user){
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
