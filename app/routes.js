'use strict';

module.exports = function(app) {

	/* User Routes */
	var user = require('./controllers/users.controller.js');

	app.route('/api/signup').post(user.save);
	app.route('/api/user/:user_id').delete(user.delete);


	/* Authentication Routes */
	var auth = require('./controllers/auth.controller.js');

	app.route('/api/signin').post(auth.signin);
	app.route('/api/signout').get(auth.signout);


	/* CreditCards Routes */
	var ccredit = require('./controllers/creditcard.controller.js');

	app.route('/api/user/:user_id/creditcards').post(ccredit.save);
	app.route('/api/user/:user_id/creditcards').get(ccredit.list);
	app.route('/api/user/:user_id/creditcards/:creditcard_id').get(ccredit.get);
	app.route('/api/user/:user_id/creditcards/:creditcard_id').put(ccredit.update);
	app.route('/api/user/:user_id/creditcards/:creditcard_id').delete(ccredit.delete);


	/* Bills Routes */
	var bill = require('./controllers/bills.controller');

	app.route('/api/user/:user_id/bills').post(bill.save);
	app.route('/api/user/:user_id/bills').get(bill.list);
	app.route('/api/user/:user_id/bills/search').get(bill.search);
	app.route('/api/user/:user_id/bills/:bill_id').get(bill.get);
	app.route('/api/user/:user_id/bills/:bill_id').put(bill.update);
	app.route('/api/user/:user_id/bills/:bill_id').delete(bill.delete);


	/* Tags Routes */
	var tag = require('./controllers/tags.controller');

	app.route('/api/user/:user_id/tags').post(tag.save);
	app.route('/api/user/:user_id/tags').get(tag.get);
	app.route('/api/user/:user_id/tags/list').get(tag.list);
	app.route('/api/user/:user_id/tags/:tag_id').put(tag.update);
	app.route('/api/user/:user_id/tags/:tag_id').delete(tag.delete);

	app.route('/api/me').get(function(req, res){
		return res.status(200).send({ success: true });
	});
};
