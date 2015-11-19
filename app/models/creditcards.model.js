'user strict';

var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var CreditCardSchema = new Schema({
	description: {
		type: String,
		required: true,
		trim: true
	},
	payment_day: {
		type: Number,
		required: true
	},
	buy_day: {
		type: Number
	},
	valid_thru: {
		type: String,
		trim: true,
		match: [/(1[0-2]|0[0-9])+(\/)+(20\d{2})/, 'Unrecognized valid thru date']
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date
	}
});

CreditCardSchema.pre('save', function(next, done){
	this.updated_at = new Date();

	next();
});

module.exports = mongoose.model('CreditCard', CreditCardSchema);
