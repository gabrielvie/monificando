'use strict';

var mongodbUri = require('mongodb-uri');

module.exports = {
	app: {
		title: 'Monificando'
	},
	port: 3000,
	database: 'mongodb://monificando:monificandopassword@ds041623.mongolab.com:41623/monificando-test',
	jwt: {
		expires_in: 60 * 6, // 60 min. * 6 hours
		secret_token: "*:^3wj,faBqb&%p"
	}
};
