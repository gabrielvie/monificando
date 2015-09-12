'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.controller');
	app.route('/api/me').get(users.index);
};
