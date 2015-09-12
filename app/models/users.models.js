'use strict';

var mongoose 	= require('mongoose'),
	Schema 	 	= mongoose.Schema,
	bcrypt		= require('bcrypt-nodejs');

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
		now = new Date(),
		salt = bcrypt.genSaltSync(10);

	user.updated_at = now;

	if (!user.created_at) {
		user.created_at = now;
	}

	if (!user.isModified('password')) return next();

	user.password = bcrypt.hashSync(this.password, salt);

	next();
});

UserSchema.methods.verifyPassword = function(password) {
	var salt = bcrypt.genSaltSync(10),
		hash = bcrypt.hashSync(password, salt);

	console.log(bcrypt.compareSync(password, hash));

	return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('User', UserSchema);
