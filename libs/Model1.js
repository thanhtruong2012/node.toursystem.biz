var Database = require("../libs/Database");
class Model1 extends Database{
    constructor() {
        super();
    }
    commonSelect(conn, data , callback, select,type){
        var where = new Array();
        
        if(typeof(data) != "undefined" && data){
            for(var key in data){
                if(key.toUpperCase().indexOf("LIKE") != -1 || key.toUpperCase().indexOf(">") != -1||
                        key.toUpperCase().indexOf("<") != -1){
                    where.push(" "+ key.trim() +" ? ");
                }else if(key.toUpperCase().indexOf("IN") != -1){
                    where.push(" "+ key.trim() +" "+ data[key] +" ");
                }else{
                    where.push(" ?? = ? ");
                }
            }
        }
        
        if(where.length>0){
            where = where.join("AND");
        }else{
            where = "";
        }

        if(select == "*"){
            var sql = "SELECT * FROM ??";
            var arr = [this.table_name];
        }else{
            var sql = "SELECT ?? FROM ??";
            var arr = [select,this.table_name];
        }

        if(where!=""){
            sql += " WHERE "+ where +";";
        }else{
            sql += ";";
        }

        for(var key in data){
            if(key.toUpperCase().indexOf("LIKE") != -1 || key.toUpperCase().indexOf(">") != -1||
                    key.toUpperCase().indexOf("<") != -1){
                arr.push(data[key]);
            }else if(key.toUpperCase().indexOf("IN") != -1){

            }else{
                arr.push(key,data[key]);
            }
        }
        this.doExecuteQuery(conn,sql,arr,data,callback,type);
    }
    
    //Do with many records
    doSelect(conn, data , callback, select){
        //var select = ['username', 'email']; ------ escape select case
        if(!(typeof(select) != "undefined" && select))
            select = "*";
        this.commonSelect(conn, data , callback, select,"select");
    }
    doSave(conn, mData , callback){
        if(typeof(mData) != "undefined" && mData.length>0){
            var i = 0;
            var temp = new Array();
            for(var key in mData){
                this.doSaveOne(conn,mData[key],function(rs){
                    i++;
                    if(rs){
                        if(rs.result.code != 0){
                            var result = {result:{code:1,msg:"Error"}};
                            callback(result);
                        }else{
                            temp.push(rs.data.id);
                        }
                        if(i == mData.length){
                            var result = {result:{code:0,msg:"Success"},data:temp};
                            callback(result);
                        }
                    }
                });
            }
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    doInsert(conn, mData , callback){
        if(typeof(mData) != "undefined" && mData.length>0){
            var i = 0;
            var temp = new Array();
            for(var key in mData){
                this.doInsertOne(conn,mData[key],function(rs){
                    i++;
                    if(rs){
                        if(rs.result.code != 0){
                            var result = {result:{code:1,msg:"Error"}};
                            callback(result);
                        }else{
                            temp.push(rs.data.id);
                        }
                        if(i == mData.length){
                            var result = {result:{code:0,msg:"Success"},data:temp};
                            callback(result);
                        }
                    }
                });
            }
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    doUpdate(conn, mData , callback){
        if(typeof(mData) != "undefined" && mData.length>0){
            var i = 0;
            var temp = new Array();
            for(var key in mData){
                this.doUpdateOne(conn,mData[key],function(rs){
                    i++;
                    if(rs){
                        if(rs.result.code != 0){
                            var result = {result:{code:1,msg:"Error"}};
                            callback(result);
                        }else{
                            temp.push(rs.data.id);
                        }
                        if(i == mData.length){
                            var result = {result:{code:0,msg:"Success"},data:temp};
                            callback(result);
                        }
                    }
                });
            }
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    doDelete(conn, mData , callback){
        if(typeof(mData) != "undefined" && mData.length>0){
            var i = 0;
            var temp = new Array();
            for(var key in mData){
                this.doDeleteOne(conn,mData[key],function(rs){
                    i++;
                    if(rs){
                        if(rs.result.code != 0){
                            var result = {result:{code:1,msg:"Error"}};
                            callback(result);
                        }else{
                            temp.push(rs.data.id);
                        }
                        if(i == mData.length){
                            var result = {result:{code:0,msg:"Success"},data:temp};
                            callback(result);
                        }
                    }
                });
            }
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    
    //Do with 1 record
    doSelectOne(conn, data , callback , select){
        if(!(typeof(select) != "undefined" && select))
            select = "*";
        this.commonSelect(conn, data , callback, select,"selectOne");
    }
    doSaveOne(conn, data , callback){
        if(typeof(data) != "undefined" && data){
            var sql = "INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?;";
            var arr = [this.table_name,data,data];
            this.doExecuteQuery(conn,sql,arr,data,callback,"save");
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    doInsertOne(conn, data , callback){
        if(typeof(data) != "undefined" && data){
            var sql = "INSERT INTO ?? SET ?;";
            var arr = [this.table_name,data];
            this.doExecuteQuery(conn,sql,arr,data,callback,"insert");
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    doUpdateOne(conn, data , callback){
        if(typeof(data) != "undefined" && data){
            var sql = "UPDATE ?? SET ? WHERE " + this.primary_key + " = ?;";
            var arr = [this.table_name,data,data[this.primary_key]];
            this.doExecuteQuery(conn,sql,arr,data,callback,"update");
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    doDeleteOne(conn, data , callback){
        if(typeof(data) != "undefined" && data){
            var sql = "DELETE FROM ?? WHERE ?";
            var arr = [this.table_name,data];
            this.doExecuteQuery(conn,sql,arr,data,callback,"delete");
        }else{
            var result = {result:{code:1,msg:"Error"}};
            callback(result);
        }
    }
    /*doQuery(conn, sql , arr , callback){
        this.doExecuteQuery(conn,sql,arr,null,callback,"query");
    }*/
}
module.exports = Model1;
