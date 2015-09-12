'use strict';

module.exports = function(app) {
	var auth = require('../../app/controllers/auth.controller');
	app.route('/api/signin').post(auth.signin);
	app.route('/api/signup').post(auth.signup);
	app.route('/api/signout').get(auth.signout);
};
