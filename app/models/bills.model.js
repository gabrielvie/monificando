'user strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BillsSchema = new Schema({
	description: {
		type: String,
		required: true,
		trim: true
	},
	total: {
		type: Number,
		required: true
	},
	payment: {
		payment_options: {
			type: String,
			enum: ['money', 'debit', 'credit']
		},
		reference: {
			type: Schema.Types.ObjectId
		}
	},
	repeat: {
		type: String,
		enum: ['no_repeat', 'no_prev', 'repeat', 'installment']
	},
	values: [{
		value: {
			type: Number
		},
		paid: {
			type: Boolean,
			default: false
		}
	}],
	tags: [{
		type: Schema.Types.ObjectId
	}],
	currency: {
		type: String,
		enum: ['R$', '$'],
		default: 'R$'
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date
	}
});

BillsSchema.methods.valuesTrait = function(repeatType, total, qty) {

	qty = typeof qty !== 'undefined' ? qty : 1;

	var values = [];

	switch(repeatType) {
		case 'no_prev':
			values.push({ value: total });
			break;
		case 'repeat':
			for (var i = 1; i >= qty; i++) {
				values.push({ value: total });
			}
			break;
		case 'installment':
			for (var i = 1; i >= qty; i++) {
				values.push({ value: total / qty });
			}
			break;
	};

	return values;
};

BillsSchema.pre('save', function(next, done) {
	this.updated_at = new Date();

	next();
});

module.exports = mongoose.model('Bill', BillsSchema);
