'use strict';

module.exports = function(app) {

	/* Authentication Routes */
	var auth = require('./controllers/auth.controller.js');
	app.route('/api/signin').post(auth.signin);
	app.route('/api/signup').post(auth.signup);
	app.route('/api/signout').get(auth.signout);

	/* User Routes */
	var user = require('./controllers/users.controller.js');
	app.route('/api/user/:user_id').delete(user.delete);

	/* CreditCards Routes */
	var ccredit = require('./controllers/creditcard.controller.js');
	app.route('/api/user/:user_id/creditcards').post(ccredit.save);


	app.route('/api/me').get(function(req, res){
		return res.status(200).send({ success: true });
	});
};
