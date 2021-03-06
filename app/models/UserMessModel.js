
var Model = require("../../libs/Model");
class UserMessModel extends Model{
	constructor() {
		super();
		this.table_name = "user_mess";
		this.primary_key = "user_token";
	}
	
	doAllRoomNotifyClear(data,callback){
		var sql = "";
		var arr = new Array();
		if(typeof(data)!="undefined" && data){
			sql += " UPDATE ?? SET mess_status = 1 WHERE user_token = ? AND room_id = ? ;";
			arr.push(this.table_name,data.user_token,data.room_id);
		}
		
		if(sql!=""){
			this.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				var result = {result:{code:0,msg:"Success"}};
				if(callback){
					callback(result);
				}
			});
		}else{
			var result = {result:{code:1,msg:"Error"}};
			if(callback){
				callback(result);
			}
		}
	}
	
	doRoomNotifyClear(data,callback){
		var sql = "";
		var arr = new Array();
		var len = data.length;
		if(len>0){
			for(var i=0;i<len;i++){
				if(typeof(data[i])!="undefined" && data[i]){
					sql += " UPDATE ?? SET mess_status = 1 WHERE user_token = ? AND room_id = ? AND mess_id = ? ;";
					arr.push(this.table_name,data[i].user_token,data[i].room_id,data[i].mess_id);
				}
			}
		}
		
		if(sql!=""){
			this.pool.query(sql,arr,function (error, results, fields) {
				if (error) throw error;
				var result = {result:{code:0,msg:"Success"}};
				if(callback){
					callback(result);
				}
			});
		}else{
			var result = {result:{code:1,msg:"Error"}};
			if(callback){
				callback(result);
			}
		}
	}
	
	/*doSelect(res,render,data,str){
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
	doInsert(res,render,data){
		var sql = "";
		
		if(typeof(data)!="undefined" && data){
			sql += " INSERT INTO ?? SET ?";
		}
		var arr = [this.table_name,data];
		
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
				var result = {result:{code:0,msg:"Success"}};
				res.send(JSON.stringify(result));return;
			});
		}else{
			var result = {result:{code:1,msg:"Error"}};
			res.send(JSON.stringify(result));return;
		}
		
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
	}*/
	
}
module.exports = function(){return new UserMessModel();}
