var Controller = require("../../libs/Controller");
class BookingController extends Controller{
	constructor(app, io) {
            super(app, io);
            var ActClassFact = new require("../factories/ActClassFact")();
            var ctrl = this;
            var nsp = io.of('/tbk');
            
            app.post('/booking/confirm', function(req, res){
                ctrl.doAuthentication(req, res, function(){
                    if(typeof(req.body.request) == "undefined" || !req.body.request){
                        ctrl.doResponse(res , 1);
                    }else{
                        ActClassFact.executeAction(req.body.request,"Booking","confirm",function(result){
                            if(typeof(result.result.code)!="undefined" && result.result.code == 0){
                                nsp.emit("hi","World");
                                //Success
                                ctrl.doResponse(res , 0);
                            }else{
                                //Error
                                ctrl.doResponse(res , 1);
                            }
                        });
                    }
                });
            });
	}
}
module.exports = function(app, io){return new BookingController(app, io);};
