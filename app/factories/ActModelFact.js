class ActModelFact{
    constructor() {
        this.pool = require('../../database').db("apiconnect_main");
        this.async = require("async");
    }
    executeAction(data,cls,action,_callback,select){
        var obj = new require("../models/"+cls+"Model")();
        var async = this.async;
        this.pool.getConnection(function(err, conn) {
            conn.beginTransaction(function(err) {
                var func = new Array();
                var func_main = function(callback) {
                    var __callback = function(result){
                        callback(null,result);
                    };
                    eval("obj."+action+"(conn, data , __callback, select);");
                };
                var func_commit = function(result) {
                    conn.commit(function(err) {
                        if (err) {
                            conn.rollback(function() {
                              throw err;
                            });
                        }
                        _callback(result);
                    });
                };
                func.push(func_main,func_commit);
                async.waterfall(func,function(err, result){});
            });
            conn.release();
        });
    }
}
module.exports = function(){return new ActModelFact();};