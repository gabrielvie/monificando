'use strict';

var fs 				= require('fs'),
	http			= require('http'),
	https			= require('https'),
	express			= require('express'),
	config 			= require('./config'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	path			= require('path'),
	morgan  		= require('morgan'),
	cors			= require('cors'),
	enviroment		= process.argv['2'];

var chalk 	= require('chalk');

module.exports = function(database) {
	//Starting express app
	var app = express();

	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// app.use(morgan('combined'));

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

	config.getGlobbedFiles('./app/middlewares/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath))(app);
	});

	config.getGlobbedFiles('./app/routes.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	app.use(function(err, req, res, next) {
		if (!err) return next();

		console.error(err.stack);

		res.status(500).send({
			error: err.stack
		});
	});

	app.use(function(req, res) {
		res.status(404).send({
			url: req.originalUrl,
			error: 'Not found'
		});
	});

	return app;
};
