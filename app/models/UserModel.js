
var Model = require("../../libs/Model");
class UserModel extends Model{
	constructor() {
		super();
		this.table_name = "user";
		this.primary_key = "user_token";
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
	doInsert(data,callback){
		var sql = "";
		if(typeof(data)!="undefined" && data){
			sql += " INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?;";
		}
		var arr = [this.table_name,data,data];
		
		if(sql!=""){
			this.pool.query(sql,arr,function (error, results, fields) {
				if (error){
					var result = {result:{code:1,msg:"Error"}};
				}else{
					var result = {result:{code:0,msg:"Success"}};
				}
				callback(result);
			});
		}else{
			var result = {result:{code:1,msg:"Error"}};
			callback(result);
		}
	}
	doUpdate(iData){
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
				if (error)
					var result = {result:{code:1,msg:"Error"}};
				else
					var result = {result:{code:0,msg:"Success"}};
				callback(result);
			});
		}else{
			var result = {result:{code:1,msg:"Error"}};
			callback(result);
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
module.exports = function(){return new UserModel();}
