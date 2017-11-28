class Database {
    constructor() {
        this.table_name = "";
        this.primary_key = "";
    }
    selectWhere(data){
        
    }
    where(){
        
    }
    in(){
        
    }
    doExecuteQuery(conn,sql,arr,data,callback,type){
        if(!(typeof(type) != "undefined" && type))
            type = "select";
        var primary_key = this.primary_key;
        conn.query(sql , arr , function(error, results, fields){
            if (error){
                console.log(this.sql);
                conn.rollback();
                throw error;
            } 
            
            var _data = null;
            var isValid = false;
            
            switch(type){
                case "selectOne":
                    if(typeof(results[0]) != "undefined" && results[0]){
                        isValid = true;
                        _data = results[0];
                    }
                    break;
                case "select":
                    if(typeof(results) != "undefined" && results){
                        isValid = true;
                        _data = results;
                    }
                    break;
                case "save":
                    if(typeof(results.affectedRows) != "undefined" && results.affectedRows > 0){
                        isValid = true;
                        _data = {id:data[primary_key]};
                    }
                    break;
                case "insert":
                    if(typeof(results.affectedRows) != "undefined" && results.affectedRows > 0){
                        isValid = true;
                        if(results.insertId>0){
                            _data = {id:results.insertId};
                        }else{
                            _data = {id:data[primary_key]};
                        }
                        
                    }
                    break;
                case "update":
                    if(typeof(results.affectedRows) != "undefined" && results.affectedRows > 0){
                        isValid = true;
                        _data = {id:data[primary_key]};
                    }
                    break;
                case "delete":
                    if(typeof(results.affectedRows) != "undefined" && results.affectedRows > 0){
                        isValid = true;
                        _data = {id:data[primary_key]};
                    }
                    break;
                case "query":
                    if(typeof(results) != "undefined" && results){
                        isValid = true;
                        _data = results;
                    }
                    break;
            }
            
            var result = {};
            if(isValid===true){
                result = {result:{code:0,msg:"Success"}};
                if(_data){
                    result.data = _data;
                }
            }else{
                result = {result:{code:1,msg:"Error"}};
            }
            callback(result);
        });
    }
}
module.exports = Database;