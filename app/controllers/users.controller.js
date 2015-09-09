'use strict';

var mongoose = require('mongoose'),
	Users = mongoose.model('Users');

exports.index = function(req, res) {
	console.log("Awweeeee!");
};

exports.create = function(req, res) {
	console.log(req);
};
