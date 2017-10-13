var gravatar = require('gravatar');
module.exports = function(app, io){
	var MessModel = new require("./app/models/MessModel")();
	var UserModel = new require("./app/models/UserModel")();
	var UserMessModel = new require("./app/models/UserMessModel")();
	var nsp = io.of('/tbk');
	
	var room_id = 1;
	nsp.on('connection', function(socket){
		
		socket.on('booking_status',function(data){
			socket.broadcast.emit('booking_status',data);
		});
		
		socket.on('booking_item_status',function(data){
			socket.broadcast.emit('booking_item_status',data);
		});
		
		socket.on('join',function(data){
			
			var sql = "";
			sql += " SELECT user.user_token,user_email,user_name,user_name_jp,agent_code,room_id";
			sql += " FROM user INNER JOIN user_room ON user_room.user_token = user.user_token";
			sql += " WHERE user.user_token = ? AND room_id = ? AND user_status = 1";
			var arr = [data.user_token,data.room_id];
			UserModel.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				if(results.length>0){
					socket.user_token = results[0].user_token;
					socket.user_name = results[0].user_name;
					socket.user_name_jp = results[0].user_name_jp;
					socket.agent_code = results[0].agent_code;
					socket.user_email = results[0].user_email;
					socket.join(results[0].room_id);
					
					var sql1 = "";
					var arr1 = new Array(); 
					var limit = 50;
					var offset = (typeof(data.page)!="undefined")?((parseInt(data.page)-1)*limit):limit
					
					
					sql1 += " SELECT mess.user_token,user_name_jp,mess.room_id,mess.mess_id,mess_txt,mess_status,modified";
					sql1 += " FROM mess INNER JOIN user_mess ON mess.mess_id=user_mess.mess_id";
					sql1 += " WHERE mess.room_id = ? AND user_mess.user_token = ?";
					sql1 += " ORDER BY mess.modified DESC LIMIT ? OFFSET ?";
					
					arr1.push(results[0].room_id,results[0].user_token,limit,offset);
					
					MessModel.pool.query(sql1,arr1,function (error, results, fields) {
						if (error) throw error;
						socket.emit('load', results);
					});
					
					//clear notify
					var iData = {
						"user_token":data.user_token,
						"room_id":data.room_id
					}
					UserMessModel.doAllRoomNotifyClear(iData,function(result){
						//if(result.result.code==0){
							//socket.emit('load', results);
						//}
					});
				}
			});
		});
		
		socket.on('get_room',function(data){
			var sql = "";
			sql += " SELECT room.room_id,room.room_code,";
			sql += " (SELECT count(*) FROM user_mess WHERE user_mess.user_token = ? AND room.room_id = user_mess.room_id AND user_mess.mess_status = 0) AS notify_num";
			sql += " FROM room INNER JOIN user_room ON room.room_id = user_room.room_id";
			sql += " WHERE user_room.user_token = ?";
			var arr = [data.user_token,data.user_token];
			UserModel.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				if(results.length>0){
					socket.emit('load_room', results);
				}
			});
		});
		
		/*socket.on('load',function(data){
			var sql = "";
			sql += " SELECT user_token,user_email,user_name,user_name_jp,agent_code,";
			sql += " IFNULL((SELECT GROUP_CONCAT(room_id SEPARATOR ',') FROM user_room WHERE user_room.user_token = user.user_token GROUP BY user_room.user_token),'') AS rooms";
			sql += " FROM user";
			sql += " WHERE user_token = ?";
			var arr = [data.user_token];
			UserModel.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				
				if(results.length>0){
					//login success
					socket.user_token = results[0].user_token;
					socket.user_name = results[0].user_name;
					socket.user_name_jp = results[0].user_name_jp;
					socket.agent_code = results[0].agent_code;
					socket.user_email = results[0].user_email;
					//socket.user_room = data.room_id;
					//socket.user_avatar = gravatar.url(results[0].user_email, {s: '140', r: 'x', d: 'mm'});
					
					// Tell the person what he should use for an avatar
					//socket.emit('img', socket.user_avatar);
						
					// Add the client to the room
					if(results[0].rooms!=""){
						var rooms_avail = results[0].rooms.split(",");
						if(rooms_avail.length>0){
							rooms_avail.forEach(function(value, index){
								socket.join(value);
							})
						}
					}
					
					var arr1 = [results[0].rooms,results[0].user_token];
					var sql1 = "SELECT user_name_jp,room_id,mess_txt,modified FROM mess WHERE room_id IN (?) OR user_token = ?";
					MessModel.pool.query(sql1,arr1,function (error, results, fields) {
						if (error) throw error;
						socket.emit('load', results);
					});
				}
			});
		});*/
		
		/*socket.on('login', function(data) {
			var sql = "";
			sql += " SELECT user_id,user_email,user_name,user_name_jp,agent_code,";
			sql += " IFNULL((SELECT GROUP_CONCAT(room_id SEPARATOR ',') FROM user_room WHERE user_room.user_id = user.user_id GROUP BY user_room.user_id),'') AS rooms";
			sql += " FROM user";
			sql += " WHERE user_email = '" + (data.user_email) + "' AND user_pass = '" + (data.user_pass) +"'"
			UserModel.pool.query(sql,function (error, results, fields) {
				if (error) throw error;
				
				if(results.length>0){
					
					socket.request.session.test = "234";
					socket.request.session.save();
					console.log(socket.request.session.test);
					//login success
					socket.user_id = results[0].user_id;
					socket.user_name = results[0].user_name;
					socket.user_name_jp = results[0].user_name_jp;
					socket.agent_code = results[0].agent_code;
					socket.user_email = results[0].user_email;
					//socket.user_room = data.room_id;
					socket.user_avatar = gravatar.url(results[0].user_email, {s: '140', r: 'x', d: 'mm'});
					
					// Tell the person what he should use for an avatar
					socket.emit('img', socket.user_avatar);
						
					// Add the client to the room
					if(results[0].rooms!=""){
						var rooms_avail = results[0].rooms.split(",");
						if(rooms_avail.length>0){
							rooms_avail.forEach(function(value, index){
								socket.join(value);
							})
						}
					}
					
					sql = "SELECT * FROM mess WHERE room_id IN (" + results[0].rooms + ") OR user_id = " + results[0].user_id;
					MessModel.pool.query(sql,function (error, results, fields) {
						if (error) throw error;
						socket.emit('load', results);
					});
				}
			});
		});*/
		
		socket.on('room_notify_clear',function(data){
			UserMessModel.doRoomNotifyClear(data,function(result){
				
			});
		})
		
		socket.on('typing',function(data){
			socket.broadcast.to(data.room_id).emit('typing',data);
		});
		socket.on('untyping',function(data){
			socket.broadcast.to(data.room_id).emit('untyping',data);
		});
		
		socket.on('chat', function(data){
			//send to all people in room
			//nsp.to(data.room_id).emit('chat',data.mess_txt);
			//send to another people in room
			if(typeof(socket.agent_code)!="undefined" && typeof(socket.user_token)!="undefined"){
				var data = {
					"mess_txt" : data.mess_txt, 
					"user_comp" : socket.agent_code, 
					"user_token" : socket.user_token,
					"user_name" : socket.user_name,
					"user_name_jp" : socket.user_name_jp,
					"room_id" : data.room_id
				};
				
				var sql = "";
				if(typeof(data)!="undefined" && data){
					sql += " INSERT INTO ?? SET ?; SELECT * FROM ?? WHERE room_id = ?;";
				}
				var arr = ["mess",data,"user_room",data.room_id];
				if(sql!=""){
					MessModel.pool.query(sql,arr,function (error, results, fields) {
						if (error) throw error;
						var mess_id = results[0].insertId;
						data.mess_id = mess_id;
						//insert message status
						var len = results[1].length;
						if(len>0){
							var sql = "";
							var arr = new Array();
							for(var i=0;i<len;i++){
								var mess_status = 0;
								if(socket.user_token==results[1][i].user_token)
									mess_status = 1;
								var iData = {
									"user_token" : results[1][i].user_token,
									"mess_id" : mess_id,
									"room_id" : results[1][i].room_id,
									"mess_status":mess_status
								};
								
								sql += " INSERT INTO ?? SET ?;";
								arr.push("user_mess");
								arr.push(iData);
							}
							MessModel.pool.query(sql,arr,function (error, results, fields) {
								if (error) throw error;
								nsp.to(data.room_id).emit('chat',data);
								
								var sql = "";
								sql += " SELECT room.room_id,room.room_code,";
								sql += " (SELECT count(*) FROM user_mess WHERE user_mess.user_token <> ? AND room.room_id = user_mess.room_id AND user_mess.mess_status = 0) AS notify_num";
								sql += " FROM room";
								sql += " WHERE room.room_id = ?";
								var arr = [socket.user_token,data.room_id];
								UserModel.pool.query(sql,arr,function (error, results, fields) {
									if (error) throw error;
									if(results.length>0){
										socket.broadcast.emit('room_notify_alert',results[0]);
									}
								});
							})
						}
					});
				}
			}
		});
	});
};
