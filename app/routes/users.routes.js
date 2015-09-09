var bodyParser = require('body-parser');

/*module.exports = function(app, express) {
	var apiRouter = express.Router();

	apiRouter.get('/', function(req, res){
		res.json({ message:'wow! welcome to our api :)'});
	});

	return apiRouter;
};*/

module.exports = function(app) {
	var users = require('../../app/controllers/users.controller');
	app.route('/api').get(users.index);
};
