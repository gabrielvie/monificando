'user strict';

var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	moment		= require('moment');

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
	date: {
		type: Date
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
	period: {
		type: String,
		enum: ['weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly', 'semiannual', 'annual']
	},
	values: [{
		value: {
			type: Number
		},
		date: {
			type: Date
		},
		paid: {
			type: Boolean,
			default: false
		}
	}],
	tags: [{
		type: Schema.Types.ObjectId
	}],
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
			for (var i = 1; i <= qty; i++) {
				values.push({ value: total });
			}
			break;
		case 'installment':
			for (var i = 1; i <= qty; i++) {
				values.push({ value: total / qty });
			}
			break;
	};


	return values;
};

BillsSchema.pre('save', function(next, done) {
	this.updated_at = new Date();

	if (this.period !== undefined && (this.repeat === 'repeat' || this.repeat === 'installment')) {
		switch (this.period) {
			case 'weekly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(this.date).add(i, 'w').format();
				}
				break;
			case 'biweekly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(this.date).add(15 * i, 'd').format();
				}			
				break;
			case 'monthly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(this.date).add(i, 'M').format();
				}
				break;
			case 'bimonthly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(this.date).add(2 * i, 'M').format();
				}
				break;
			case 'quarterly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(this.date).add(i, 'Q').format();
				}
				break;
			case 'semiannual':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(this.date).add(2 * i, 'Q').format();
				}
				break;
			case 'annual':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(this.date).add(i, 'y').format();
				}
				break;
		}
	}

	next();
});

module.exports = mongoose.model('Bill', BillsSchema);
