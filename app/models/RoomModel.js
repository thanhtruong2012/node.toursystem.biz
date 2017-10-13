
var Model = require("../../libs/Model");
class RoomModel extends Model{
	constructor() {
		super();
		this.table_name = "room";
		this.primary_key = "room_id";
	}
	doSelect(res,render,data,str){
		if(typeof(str)=="undefined")
			str = "*";
		var sql = "";
		sql += " SELECT * FROM ?? ";
		
		if(typeof(data)!="undefined" && data){
			sql += " WHERE ?";
		}
		var arr = [this.table_name,data];
		
		if(sql!=""){
			this.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				console.log(results);
				var data = {users:results};
				res.render(render, data);
			});
		}else{
			res.send("Error");
		}
		
	}
	doInsert(res,render,iData){
                var model  = this;
            
		var sql = "";var sql1 = "";
		var length = iData.length;
		var arr = new Array();var arr1 = new Array();
		if(length>0){
			for(var i=0;i<length;i++){
				var data = iData[i];
				if(typeof(data)!="undefined" && data && typeof(data[this.primary_key])!="undefined"){
					var user_token = data["user_token"];
					var user_name = data["user_name"];
					var is_sbj = (typeof(data["is_sbj"])!="undefined"&&data["is_sbj"]==true)?true:false;
					sql += " INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?;";
					arr.push(this.table_name);
					var room = {"room_id":data.room_id,"room_code":data.room_code};
					arr.push(room);
					arr.push(room);
					if(typeof(user_token)!="undefined" && user_token){
						sql += " INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?;";
						var user_room = {"user_token":user_token,"room_id":data.room_id};
						arr.push("user_room",user_room,user_room);
						
						sql += " INSERT INTO ?? SELECT ? AS user_token,mess_id,room_id,0 AS mess_status FROM ?? WHERE ?";
						arr.push("user_mess",user_token,"mess",{"room_id":data.room_id});
                        
						if(is_sbj){
                                                    console.log(data.room_id);
							sql1 += " UPDATE ?? SET ? WHERE avion_booking_id = ? AND (sbj_user_token IS NULL OR sbj_user_token = '');";
                                                        sql1 += " UPDATE ?? SET ? WHERE booking_id = ? AND (sbj_user_token IS NULL OR sbj_user_token = '');";
							var d = {"sbj_user_token":user_token,"sbj_user_name":user_name};
                                                        arr1.push("booking",d,data.room_id);
                                                        arr1.push("nbooking",d,data.room_id);
						}
					}
				}
			}
		}
		if(sql!=""){
			model.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				if(sql1!=""){
					model.pool1.query(sql1,arr1,function (error, results, fields) {
						if (error) throw error;
                                                console.log(results);
						var result = {result:{code:0,msg:"Success"}};
						res.send(JSON.stringify(result));
					});
				}else{
					var result = {result:{code:0,msg:"Success"}};
					res.send(JSON.stringify(result));
				}
			});
		}else{
			var result = {result:{code:1,msg:"Error"}};
			res.send(JSON.stringify(result));
		}
	}
	doUpdate(res,render,iData){
		var sql = "";
		var user_token = "";
		var length = iData.length;
		var arr = new Array();
		if(length>0){
			for(var i=0;i<length;i++){
				var data = iData[i];
				
				if(typeof(data)!="undefined" && data && typeof(data[this.primary_key])!="undefined"){
					user_token = data["user_token"];
					var isDel = false;
					if(data["del_flg"]==-1){
						isDel = true;
					}
					delete data["del_flg"];
					delete data["user_id"];
					sql += "DELETE FROM ?? WHERE " + this.primary_key + " = ? ;";
					arr.push(this.table_name);
					arr.push(user_token);
						
					if(!isDel){
						sql += " INSERT INTO ?? SET ? ;";
						arr.push(this.table_name);
						arr.push(data);
					}
				}
			}
		}
		
		if(sql!=""){
			this.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				//var data = {users:results};
				//res.render(render, data);
				var result = {result:{code:0,msg:"Success"}};
				res.send(JSON.stringify(result));return;
			});
		}else{
			var result = {result:{code:1,msg:"Error"}};
			res.send(JSON.stringify(result));return;
		}
		
		
		/*if(typeof(data)!="undefined" && data && typeof(data[this.primary_key])!="undefined"){
			user_id = data[this.primary_key];
			sql += " UPDATE ?? SET ? WHERE " + this.primary_key + " = ?";
		}
		var arr = [this.table_name,data,user_id];
		
		if(sql!=""){
			this.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				var data = {users:results};
				res.render(render, data);
			});
			
		}else{
			res.send("Error");
		}*/
	}
	doDelete(res,render,id){
		var sql = "";
		if(typeof(id)!="undefined" && id){
			sql += "DELETE FROM ?? WHERE " + this.primary_key + " = ?";
		}
		var arr = [this.table_name,id];
		
		if(sql!=""){
			this.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				var data = {users:results};
				res.render(render, data);
			});
			
		}else{
			res.send("Error");
		}
	}
}
module.exports = function(){return new RoomModel();}
