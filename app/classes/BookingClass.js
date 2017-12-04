var Class = require("../../libs/Class");
class BookingClass extends Class{
    constructor() {
        super();
    }
    save(conn,data){
        var func = new Array();
        //callback
        var BookingModel = this.loadModel("Booking");
        var BookingEmailModel = this.loadModel("BookingEmail");
        var BookingFlightModel = this.loadModel("BookingFlight");
        var BookingGuestModel = this.loadModel("BookingGuest");
        var BookingHistModel = this.loadModel("BookingHist");
        var BookingHotelModel = this.loadModel("BookingHotel");
        var BookingOptionModel = this.loadModel("BookingOption");
        
        if(typeof(data["booking"]) != "undefined" && data["booking"]){
            
            var oData = {};
            
            var func1 = function(callback){
                BookingModel.doSaveOne(conn,data["booking"],function(rs){
                    callback(null,rs);
                    oData["booking"] = rs.data;
                });
            };
            func.push(func1);
            
            if(typeof(data["booking_email"]) != "undefined" && data["booking_email"]){
                var func2 = function(result,callback){
                    BookingEmailModel.doSave(conn,data["booking_email"],function(rs){
                        callback(null,rs);
                        oData["booking_email"] = rs.data;
                    });
                };
                func.push(func2);
            }
            
            if(typeof(data["booking_flight"]) != "undefined" && data["booking_flight"]){
                var func3 = function(result,callback){
                    BookingFlightModel.doSave(conn,data["booking_flight"],function(rs){
                        callback(null,rs);
                        oData["booking_flight"] = rs.data;
                    });
                };
                func.push(func3);
            }
            
            if(typeof(data["booking_guest"]) != "undefined" && data["booking_guest"]){
                var func4 = function(result,callback){
                    BookingGuestModel.doSave(conn,data["booking_guest"],function(rs){
                        callback(null,rs);
                        oData["booking_guest"] = rs.data;
                    });
                };
                func.push(func4);
            }
            
            if(typeof(data["booking_hist"]) != "undefined" && data["booking_hist"]){
                var func5 = function(result,callback){
                    BookingHistModel.doSave(conn,data["booking_hist"],function(rs){
                        callback(null,rs);
                        oData["booking_hist"] = rs.data;
                    });
                };
                func.push(func5);
            }
            
            if(typeof(data["booking_hotel"]) != "undefined" && data["booking_hotel"]){
                var func6 = function(result,callback){
                    BookingHotelModel.doSave(conn,data["booking_hotel"],function(rs){
                        callback(null,rs);
                        oData["booking_hotel"] = rs.data;
                    });
                };
                func.push(func6);
            }
            
            if(typeof(data["booking_option"]) != "undefined" && data["booking_option"]){
                var func7 = function(result,callback){
                    BookingOptionModel.doSave(conn,data["booking_option"],function(rs){
                        callback(null,rs);
                        oData["booking_option"] = rs.data;
                    });
                };
                func.push(func7);
            }
            
            var func8 = function(result,callback){
                callback(null,oData);
            };
            func.push(func8);
        }else{
            var func1 = function(callback){
                callback(null,null);
            };
            func.push(func1);
        }
        
        return func;
    }
    confirm(conn,body){
        var func = new Array();
        //callback
        var BookingModel = this.loadModel("Booking");
        var BookingAgentModel = this.loadModel("BookingAgent");
        var BookingFlightModel = this.loadModel("BookingFlight");
        var BookingGuestModel = this.loadModel("BookingGuest");
        var BookingHistModel = this.loadModel("BookingHist");
        var BookingHotelModel = this.loadModel("BookingHotel");
        var BookingOptionModel = this.loadModel("BookingOption");
        var request = body.request;
        var auth = body.auth;
        if(typeof(request) != "undefined" && request){
            var func1 = function(callback){
                var iData = {
                    "agent_cd":auth["agent_cd"],
                    "booking_id":request["booking_id"],
                    "agent_booking_id":request["agent_booking_id"],
                    "agent_booking_cd":request["agent_booking_cd"],
                    "agent_booking_status":request["agent_booking_status"],
                    "agent_confirm_user":request["agent_confirm_user"]
                };
                BookingAgentModel.doSaveOne(conn,iData,function(res){
                    callback(null,res);
                });
            };
            func.push(func1);
            
            if(typeof(request["booking_guest"]) != "undefined" && request["booking_guest"]){
                var func2 = function(result,callback){
                    var iData = new Array();
                    for(var key in request["booking_guest"]){
                        iData.push({
                            "booking_guest_id":request["booking_guest"][key]["booking_guest_id"],
                            "agent_status":request["booking_guest"][key]["agent_status"]
                        });
                    }
                    BookingGuestModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func2);
            }
            
            if(typeof(request["booking_flight"]) != "undefined" && request["booking_flight"]){
                var func3 = function(result,callback){
                    var iData = new Array();
                    for(var key in request["booking_flight"]){
                        iData.push({
                            "booking_flight_id":request["booking_flight"][key]["booking_flight_id"],
                            "curr_cd":request["booking_flight"][key]["curr_cd"],
                            "total_price":request["booking_flight"][key]["total_price"],
                            "average_price":request["booking_flight"][key]["average_price"],
                            "agent_status":request["booking_flight"][key]["agent_status"]
                        });
                    }
                    BookingFlightModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func3);
            }
            
            if(typeof(request["booking_hotel"]) != "undefined" && request["booking_hotel"]){
                var func4 = function(result,callback){
                    var iData = new Array();
                    for(var key in request["booking_hotel"]){
                        iData.push({
                            "booking_hotel_id":request["booking_hotel"][key]["booking_hotel_id"],
                            "curr_cd":request["booking_hotel"][key]["curr_cd"],
                            "total_price":request["booking_hotel"][key]["total_price"],
                            "average_price":request["booking_hotel"][key]["average_price"],
                            "agent_status":request["booking_hotel"][key]["agent_status"]
                        });
                    }
                    BookingHotelModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func4);
            }
            
            if(typeof(request["booking_option"]) != "undefined" && request["booking_option"]){
                var func5 = function(result,callback){
                    var iData = new Array();
                    for(var key in request["booking_option"]){
                        iData.push({
                            "booking_option_id":request["booking_option"][key]["booking_option_id"],
                            "curr_cd":request["booking_option"][key]["curr_cd"],
                            "total_price":request["booking_option"][key]["total_price"],
                            "average_price":request["booking_option"][key]["average_price"],
                            "agent_status":request["booking_option"][key]["agent_status"]
                        });
                    }
                    BookingOptionModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func5);
            }
            
            var func6 = function(result,callback){
                var iData = {
                    "booking_id":request["booking_id"]
                };
                BookingModel.doRefreshPrice(conn,iData,function(res){
                    if(res.result.code == 0){
                        request["total_price"] = res.data.total_price;
                        request["average_price"] = res.data.average_price;
                    }
                    callback(null,res);
                });
            };
            func.push(func6);
            
            
            var func7 = function(result,callback){
                var iData = {
                    "booking_id" : request["booking_id"],
                    "remarks" : "Agent Confirm",
                    "user_id" : -1,
                    "user_name" : auth["agent_cd"],
                    "ischeck" : 0
                };
                BookingHistModel.doInsertOne(conn,iData,function(res){
                    res.data = request;
                    callback(null,res);
                });
            };
            func.push(func7);
        }else{
             var func1 = function(callback){
                 callback(null,{"result":{"code":1,"msg":"Request Error"}});
             };
             func.push(func1);
        }
        return func;
    }
}

module.exports = function(){return new BookingClass();};