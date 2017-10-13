var Controller = require("../../libs/Controller");
class UserMessController extends Controller{
	constructor(app, io) {
		super(app, io);
		var UserMessModel = this.loadModel("UserMess");
		app.post('/user_mess/notify_clear', function(req, res){
			var rq_data = req.body;
			var iData = {
				"user_token":rq_data.user_token,
				"room_id":rq_data.room_id
			};
			
			UserMessModel.doAllRoomNotifyClear(iData,function(result){
				res.send(result);
			});
		});
		/*app.get('/user/list', function(req, res){
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
			var view = "user/create";
			UserModel.doInsert(res,view,iData);
		});
		app.post('/user/update', function(req, res){
			var iData = req.body;
			var view = "user/update";
			UserModel.doUpdate(res,view,iData);
		});
		app.post('/user/delete', function(req, res){
			var iData = req.body;
			var id = iData["user_id"];
			var view = "user/delete";
			UserModel.doDelete(res,view,id);
		});*/
	}
}
module.exports = function(app, io){return new UserMessController(app, io);}
