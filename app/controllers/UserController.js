var Controller = require("../../libs/Controller");
class UserController extends Controller{
	constructor(app, io) {
		super(app, io);
		var UserModel = this.loadModel("User");
		
		app.get('/user/list', function(req, res){
			var iData = null;
			var view = "user/list";
			UserModel.doSelect(res,view,iData,"*");
		});
		app.get('/user/:user_id(\\d+)', function(req, res){
			var iData = {"user_id":req.params.user_id};
			var view = "user/detail";
			UserModel.doSelect(res,view,iData,"*");
		});
		app.post('/user/create', function(req, res){
			var iData = req.body;
			UserModel.doInsert(iData,function(result){
				res.send(result);
			});
		});
		app.post('/user/update', function(req, res){
			var iData = req.body;
			UserModel.doUpdate(iData,function(result){
				res.send(result);
			});
		});
		app.post('/user/delete', function(req, res){
			var iData = req.body;
			var id = iData["user_id"];
			var view = "user/delete";
			UserModel.doDelete(res,view,id);
		});
	}
}
module.exports = function(app, io){return new UserController(app, io);}
