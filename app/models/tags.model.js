'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var TagsSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date
	}
});

TagsSchema.pre('save', function(next, done) {
    this.updated_at = new Date();
    
    next();
});

module.exports = mongoose.model('Tags', TagsSchema);