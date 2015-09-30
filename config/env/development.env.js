'use strict';

var mongodbUri = require('mongodb-uri');

module.exports = {
	app: {
		title: 'Monificando - Development Edition'
	},
	port: 3001,
	database: function() {
		var mongoLab = 'mongodb://localhost/dev_monificando';

		return mongodbUri.formatMongoose(mongoLab);
	},
	jwt: {
		expires_in: 60 * 6, // 60 min. * 6 hours
		secret_token: "*:^3wj,faBqb&%p"
	}
};
