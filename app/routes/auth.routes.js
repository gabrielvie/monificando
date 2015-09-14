'use strict';

module.exports = function(app) {
	var auth = require('../../app/controllers/auth.controller');
	app.route('/signin').post(auth.signin);
	app.route('/signup').post(auth.signup);
	app.route('/signout').get(auth.signout);
};
