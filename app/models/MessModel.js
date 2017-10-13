
var Model = require("../../libs/Model");
class MessModel extends Model{
	constructor() {
		super();
		this.table_name = "mess";
		this.primary_key = "mess_id";
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
				var data = results;
				if(res)
					res.render(render, data);
			});
		}else{
			if(res)
				res.send("Error");
		}
	}
	doUpdate(res,render,data){
		var sql = "";
		var user_id = 0;
		if(typeof(data)!="undefined" && data && typeof(data[this.primary_key])!="undefined"){
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
	}
}
module.exports = function(){return new MessModel();}
