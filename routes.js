var UserModel = new require("./app/models/UserModel")();

module.exports = function(app,io){
	
	app.use(function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

		// Pass to next layer of middleware
		next();
	});
	
	app.get('/', function(req, res){
		res.render("home")
	})
	
	app.get('/login/:user_email/:user_pass', function(req, res){
		
		var user_email = req.params.user_email;
		var user_pass = req.params.user_pass;
		var sql = "";
		sql += " SELECT user_id,user_email,user_name,user_name_jp,agent_code,";
		sql += " IFNULL((SELECT GROUP_CONCAT(room_id SEPARATOR ',') FROM user_room WHERE user_room.user_id = user.user_id GROUP BY user_room.user_id),'') AS rooms";
		sql += " FROM user";
		sql += " WHERE user_email = '" + (user_email) + "' AND user_pass = '" + (user_pass) +"'"
		UserModel.pool.query(sql,function (error, results, fields) {
			if (error) throw error;
			
			if(results.length>0){
				var user_data = {
					user_id:results[0].user_id,
					user_name:results[0].user_name,
					user_name_jp:results[0].user_name_jp,
					agent_code:results[0].agent_code,
					user_email:results[0].user_email,
					rooms:results[0].rooms
				};
				//req.session.user_data = user_data;
				req.session.test = "123";
				req.session.save();
				console.log(req.sessionID);
				res.header('Access-Control-Allow-Credentials', 'true');
				res.send({token:123456});
			}
		});
	});
	
	app.get(/.*/, function(req, res){
		res.send("Error");
	});
};