'use strict';

var mongoose 	= require('mongoose'),
	Schema 	 	= mongoose.Schema,
	crypto		= '';

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	token: {
		type: String
	},
	created_at: Date,
	updated_at: Date,
	data: {
		first_name: {
			type: String,
			required: true,
			trim: true
		},
		last_name: {
			type: String,
			required: true,
			trim: true
		},
		birthday: {
			type: Date,
			required: true
		},
		gender: {
			type: String,
			required: true,
			enum: ['male', 'female']
		},
		contact: [{
			type: String,
			trim: true
		}]
	}
});

UserSchema.pre('save', function(next){
	var user = this,
		now = new Date();

	user.updated_at = now;

	if (!user.created_at) {
		user.created_at = now;
	}

	if (!user.isModified('password')) return next();

	next();
});


module.exports = mongoose.model('User', UserSchema);
