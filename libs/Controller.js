var bodyParser = require('body-parser')
class Controller {
    constructor(app, io) {
        // Add headers
        app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
    loadModel(n){
        return new require("../app/models/"+n+"Model")();
    }
    doAuthentication(req,res,callback){
        var ctrl = this;
        if(typeof(req.body.auth)=="undefined" || !req.body.auth){
            ctrl.doResponse(res , 2);
        }else{
            var ActModelFact = new require("../app/factories/ActModelFact")();
            ActModelFact.executeAction(req.body.auth,"Agent","doSelectOne",function(result){
                if(result.result.code != 0){
                    ctrl.doResponse(res , 2);
                }else{
                    callback();
                }
            });
        }
    }
    doResponse(res,result){
        var rs = {"result":{"code":1,"msg":"Error"}};
        if(Number.isInteger(result)){
            switch(parseInt(result)){
                case 0:
                    rs = {"result":{"code":0,"msg":"Success"}};
                    break;
                case 1:
                    rs = {"result":{"code":1,"msg":"Error"}};
                    break;
                case 2:
                    rs = {"result":{"code":2,"msg":"Authentication Error"}};
                    break;
            }
        }else{
            rs = result;
        }
        res.send(rs);
    }
    
}
module.exports = Controller;