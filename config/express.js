'use strict';

var fs 				= require('fs'),
	http			= require('http'),
	https			= require('https'),
	express			= require('express'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	config			= require('./config'),
	path			= require('path'),
	morgan  		= require('morgan'),
	cors			= require('cors'),
	jwt				= require('jsonwebtoken'),
	enviroment		= process.argv['2'];

var chalk 	= require('chalk');

module.exports = function(database) {
	//Starting express app
	var app = express();

	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

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

	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	app.set('showStackError', true);
	app.set('view engine', 'html');

	if (enviroment === 'development') {
		app.use(morgan('dev'));
	} else if (enviroment === 'production'){
		app.locals.cache = 'memory'
	}

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(express.static(path.resolve('./public')));

	app.use(function(req, res, next) {
		var token 			= req.body.token || req.param('token') || req.headers['token'],
			_				= require('underscore'),
			nonSecurePaths 	= ['/', '/api/signin', '/api/signup'];

		res.type('application/json');

		if (_.contains(nonSecurePaths, req.path)) return next();

		if (token) {
			jwt.verify(token, config.jwt.secret_token, function(err, decoded) {
				if (err) {
					return res.status(401).send({ message: 'Failed to authenticate token.' });
				} else {
					req.decode = decoded;
					next();
				}
			});
		} else {
			return res.status(401).send({ message: 'No token provided.'	});
		}
	});

	config.getGlobbedFiles('./app/routes.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	app.use(function(err, req, res, next) {
		if (!err) return next();

		console.error(err.stack);

		res.status(500).send('500', {
			error: err.stack
		});
	});

	app.use(function(req, res) {
		res.status(404).send('404', {
			url: req.originalUrl,
			error: 'Not found'
		});
	});

	return app;
};
