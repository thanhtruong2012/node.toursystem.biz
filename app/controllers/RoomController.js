var Controller = require("../../libs/Controller");
class RoomController extends Controller{
	constructor(app, io) {
		super(app, io);
		var RoomModel = this.loadModel("Room");
		var UserRoomModel = this.loadModel("UserRoom");
		app.get('/room/list', function(req, res){
			var iData = null;
			var view = "room/list";
			RoomModel.doSelect(res,view,iData,"*");
		});
		app.get('/room/:room_id(\\d+)', function(req, res){
			var iData = {"room_id":req.params.room_id};
			var view = "room/detail";
			RoomModel.doSelect(res,view,iData,"*");
		});
		app.post('/room/create', function(req, res){
			var iData = req.body;
			var view = "room/create";
			RoomModel.doInsert(res,view,iData);
		});
		app.post('/room/update', function(req, res){
			var iData = req.body;
			var view = "room/update";
			RoomModel.doUpdate(res,view,iData);
		});
		app.post('/room/delete', function(req, res){
			var iData = req.body;
			var id = iData["room_id"];
			var view = "room/delete";
			RoomModel.doDelete(res,view,id);
		});
		app.post('/room/add_user', function(req, res){
			var iData = req.body;
			var room_id = iData["room_id"];
			var user_token = iData["user_token"];
			var view = "room/add_user";
			RoomModel.doAddUser(res,view,id);
		});
	}
}
module.exports = function(app, io){return new RoomController(app, io);}
