'use strict';

var _ 		= require('lodash'),
	glob 	= require('glob');


module.exports = _.extend(
	require('./env/production.env')
);

module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {

	var _this 		= this,
		urlRegex 	= new RegExp('^(?:[a-z]+:)?\/\/', 'i'),
		output		= [];

	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

