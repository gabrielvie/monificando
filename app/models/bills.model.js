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
		type: String,
		enum: ['no_repeat', 'no_prev', 'repeat', 'installment'],
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

BillsSchema.methods.onUpdateValue = function(vObj) {

	switch(this.repeat) {
		case 'no_prev':

			if (vObj.before === true) {

				for (var i = 0; i < this.values.length; i++) {
					this.values[i].value = vObj.value;
				}

			} else {

				var last = this.values.length - 1;
				this.values[last].value = vObj.value;

			}

			break;

		case 'repeat':
		case 'no_repeat':

			for (var i = 0; i < this.values.length; i++) {
				this.values[i].value = vObj.value;
			}

			break;

		case 'installment':

			for (var i = 0; i < this.values.length; i++) {
				this.values[i].value = vObj.value / this.values.length;
			}

			break;
	};

	if (this.period !== undefined && (this.repeat === 'repeat' || this.repeat === 'installment')) {
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
	}

	return this.values;
};

BillsSchema.methods.onCreateValue = function(vObj) {

	switch(this.repeat) {
		case 'no_prev':
		case 'no_repeat':
			this.values.push({ value: vObj.value });
			break;
		case 'repeat':
			for (var i = 1; i <= vObj.qty; i++) {
				this.values.push({ value: vObj.value });
			}
			break;
		case 'installment':
			for (var i = 1; i <= vObj.qty; i++) {
				this.values.push({ value: vObj.value / vObj.qty });
			}
			break;
	};


	if (this.period !== undefined && (this.repeat === 'repeat' || this.repeat === 'installment')) {
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
	} else if (this.repeat === 'no_repeat') {

		this.values[0].date = new Date(vObj.date);

	}
};


BillsSchema.pre('save', function(next, done) {
	this.updated_at = new Date();

	next();
});

module.exports = mongoose.model('Bill', BillsSchema);
