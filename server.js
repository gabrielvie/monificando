var config		= require('./config/config'),
	mongoose	= require('mongoose'),
	chalk 		= require('chalk'),
	database	= null;

var uriUtil = require('mongodb-uri');

/*app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));*/

var mongolabUri = 'mongodb://monificando:monificandopassword@ds041623.mongolab.com:41623/monificando-test';
var mongooseUri = uriUtil.formatMongoose(mongolabUri);

database = mongoose.connect(mongooseUri, function (err) {
	if (err) {
		console.error(chalk.red('Couldn\'t connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

var app = require('./config/express')(database);

app.listen(3000);
