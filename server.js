var config		= require('./config/config'),
	mongoose	= require('mongoose'),
	databaseUri = config.database(),
	chalk 		= require('chalk');

database = mongoose.connect(databaseUri, function (err) {
	if (err) {
		console.error(chalk.red('Couldn\'t connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

var app = require('./config/express')(database);

app.listen(config.port, function(){
	console.log(config.app.title + ": running @http://localhost:" + config.port);
});
