'use strict';

var mongodbUri = require('mongodb-uri');

module.exports = {
	app: {
		title: 'Monificando - Development Edition'
	},
	port: 8080,
	database: function() {
		return 'mongodb://monificando:adfa031c828872c72c3c6c58f484dd52@127.0.0.1:27017/monificando'
	},
	jwt: {
		expires_in: 60 * 6, // 60 min. * 6 hours
		secret_token: "*:^3wj,faBqb&%p"
	}
};
