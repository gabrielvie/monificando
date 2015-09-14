'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.controller');
	app.route('/me').get(users.index);
};
