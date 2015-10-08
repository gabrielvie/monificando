'use strict';

var mongoose    = require('mongoose'),
	User 	 	= mongoose.model('User'),
	Tags	    = mongoose.model('Tags');

exports.save = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		var nTag = new Tags(req.body);
		
		user.tags.push(nTag);
		
		user.save(function(err, savedUser) {
		    if (err) { res.status(501).send(err); return; }
		    
		    res.status(201).send({
		        success: true
		    });
		});
	});
};


exports.get = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		res.status(200).send({});
	});
};


exports.list = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		res.status(200).send({ success: true, list: user.tags });
	});
};


exports.update = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {		
		if (err || !user) {
			res.status(404).send({ success: false, err: err });
			return;
		}

		user.tags.forEach(function(tag, idx) {
			if (tag._id == req.params.tag_id) {
				var to_set = {};
				
				for(var field in req.body) {
					to_set['tags.' + idx + '.' + field] = req.body[field];
				}

				user.set(to_set);
			}

		});

		user.save(function(err, user) {
			if (err) {
				res.status(304).send({ success: false, err: err });
				return;
			}

			res.status(200).send({ success: true, data: user.tags.id(req.params.tag_id) });
		});

	});
};


exports.delete = function(req, res) {

	User.findById(req.params.user_id, function(err, user) {
		if (err) { res.status(404).send(err); return; }
		
		user.tags.id(req.params.tag_id).remove();

		user.save(function(err, user) {
			if (err) { res.status(304).send(err); return; }

			res.status(200).send({ deleted: true });
		});
	});
};
