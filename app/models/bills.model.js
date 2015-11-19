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
	payment: {
		form: {
			type: String,
			enum: ['money', 'debit', 'credit'],
			default: 'money'
		},
		reference: {
			type: Schema.Types.ObjectId
		}
	},
	repeat: {
		type: Boolean,
		default: false,
		required: true
	},
	period: {
		type: String,
		enum: ['', 'weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly', 'semiannual', 'annual']
	},
	values: [{
		value: {
			type: Number,
			required: true
		},
		date: {
			type: Date,
			required: true
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

BillsSchema.methods.onUpdateValue = function(vObj) {

	for (var i = 0; i < this.values.length; i++) {
		this.values[i].value = vObj.value;
	}

	if (this.period !== undefined && this.repeat === true) {

		switch (this.period) {
			case 'weekly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'w').format();
				}
				break;
			case 'biweekly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(15 * i, 'd').format();
				}
				break;
			case 'monthly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'M').format();
				}
				break;
			case 'bimonthly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(2 * i, 'M').format();
				}
				break;
			case 'quarterly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'Q').format();
				}
				break;
			case 'semiannual':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(2 * i, 'Q').format();
				}
				break;
			case 'annual':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'y').format();
				}
				break;
		}

	} else {

		this.values[0].date = new Date(vObj.date);

	}

	return this.values;
};

BillsSchema.methods.onCreateValue = function(vObj) {

	if (this.repeat) {

		for (var i = 1; i <= vObj.qty; i++) {
			this.values.push({ value: vObj.value });
		}

	} else {

		this.values.push({ value: vObj.value });

	}


	if (this.period !== undefined && this.repeat === true) {

		switch (this.period) {
			case 'weekly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'w').format();
				}
				break;
			case 'biweekly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(15 * i, 'd').format();
				}
				break;
			case 'monthly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'M').format();
				}
				break;
			case 'bimonthly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(2 * i, 'M').format();
				}
				break;
			case 'quarterly':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'Q').format();
				}
				break;
			case 'semiannual':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(2 * i, 'Q').format();
				}
				break;
			case 'annual':
				for (var i = 0; i < this.values.length; i++) {
					this.values[i].date = moment(vObj.date).add(i, 'y').format();
				}
				break;
		}

	} else if (!this.repeat) {

		this.values[0].date = new Date(vObj.date);

	}
};


BillsSchema.pre('save', function(next, done) {
	this.updated_at = new Date();

	next();
});

module.exports = mongoose.model('Bill', BillsSchema);
