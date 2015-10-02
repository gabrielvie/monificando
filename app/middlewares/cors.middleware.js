'use strict';

var cors = require('cors');

module.exports = function(app) {
	
	var whiteList 	= ['http://monificando.dev', 'http://homolog.monificando.com', 'http://monificando.com'],
		corsOptions	= {
			origin: function(origin, callabck) {
				var originIsWhiteListed = whiteList.indexOf(origin) !== -1;
				callabck(null, originIsWhiteListed);
			}
		};

	app.use(cors(corsOptions));

	app.use(function(req, res, next) {

		// CORS headers
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, accept');

		if (req.method == 'OPTIONS') {
			res.status(200).end();
		} else {
			next();
		}
	});

};