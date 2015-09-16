'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.index = function(req, res) {
	res.message = "Awweeeee!";

	return res;
};
