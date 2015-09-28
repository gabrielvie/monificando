'use strict';

var mongoose 	= require('mongoose'),
	Schema 	 	= mongoose.Schema,
	crypto		= require('crypto');

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		index: {
			unique: true
		},
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	password: {
		type: String,
		required: true,
		trim: true,
		match: [/((?=.*\d)(?=.*[a-z]).{6,20})/, 'Please fill a password with letters and numbers']
	},
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
	}],
	salt: {
		type: String
	},
	token: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date
	}
});

UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password)
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	else
		return password;

};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.pre('save', function(next, done){
	this.updated_at = new Date();

	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

module.exports = mongoose.model('User', UserSchema);
