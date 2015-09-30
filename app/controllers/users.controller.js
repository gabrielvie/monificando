'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.delete = function(req, res) {

	User.remove({ _id: req.params.user_id  }, function(err, user) {
		if (err) { res.status(304).send(err); return; }

		res.status(200).send({ deleted: true });
	});
};
