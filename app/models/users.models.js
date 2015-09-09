var mongoose 	= require('mongoose'),
	Schema 	 	= mongoose.Schema;

var UsersSchema = new Schema({
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

UsersSchema.pre('save', function(next){
	now = new Date();

	this.updated_at = now;

	if (!this.created_at) {
		this.created_at = now;
	}

	next();
});

module.exports = mongoose.model('Users', UsersSchema);
