'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.index = function(req, res) {
	req.message = "Awweeeee!";

	return req;
};
