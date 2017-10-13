var bodyParser = require('body-parser')
class Controller {
	constructor(app, io) {
		// Add headers
		app.use(function (req, res, next) {
			// Website you wish to allow to connect
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);
			next();
		});
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
	}
	loadModel(n){
		return new require("../app/models/"+n+"Model")();
	}
}
module.exports = Controller;