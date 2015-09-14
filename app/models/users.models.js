'use strict';

var mongoose 	= require('mongoose'),
	Schema 	 	= mongoose.Schema,
	crypto		= require('crypto');

var UserSchema = new Schema({
	email: {
		type: String,
		match: [/.+\@.+\..+/, 'Please fill a valid email address'],
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
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
	},
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

UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password)
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	else
		return password;

};

UserSchema.pre('save', function(next, done){
	this.updated_at = new Date();

	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;

User.schema.path('email').validate(function(value, respond) {
	User.findOne({ email: value }, function(err, user) {
		if (user) respond(false);
	});
}, 'Este endereço de email já encontra-se em uso.');
