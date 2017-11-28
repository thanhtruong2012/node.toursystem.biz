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
            console.log(123);
            var func1 = function(callback){
                callback(null,null);
            };
            func.push(func1);
        }
        
        return func;
    }
    confirm(conn,data){
        var func = new Array();
        //callback
        var BookingModel = this.loadModel("Booking");
        var BookingFlightModel = this.loadModel("BookingFlight");
        var BookingGuestModel = this.loadModel("BookingGuest");
        var BookingHistModel = this.loadModel("BookingHist");
        var BookingHotelModel = this.loadModel("BookingHotel");
        var BookingOptionModel = this.loadModel("BookingOption");
        
        if(typeof(data) != "undefined" && data){
            var func1 = function(callback){
                var iData = {
                    "booking_id":data["booking_id"],
                    "sbj_booking_status":data["agent_status"],
                    "sbj_user_name":data["confirm_staff_name"],
                    "total_price":data["total_price"],
                    "average_price":data["average_price"]
                };
                BookingModel.doUpdateOne(conn,iData,function(res){
                    callback(null,res);
                });
            };
            func.push(func1);
            
            if(typeof(data["booking_guest"]) != "undefined" && data["booking_guest"]){
                var func2 = function(result,callback){
                    var iData = new Array();
                    for(var key in data["booking_guest"]){
                        iData.push({
                            "booking_guest_id":data["booking_guest"][key]["booking_guest_id"],
                            "agent_status":data["booking_guest"][key]["agent_status"]
                        });
                    }
                    BookingGuestModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func2);
            }
            
            if(typeof(data["booking_flight"]) != "undefined" && data["booking_flight"]){
                var func3 = function(result,callback){
                    var iData = new Array();
                    for(var key in data["booking_flight"]){
                        iData.push({
                            "booking_flight_id":data["booking_flight"][key]["booking_flight_id"],
                            "total_price":data["booking_flight"][key]["total_price"],
                            "average_price":data["booking_flight"][key]["average_price"],
                            "agent_status":data["booking_flight"][key]["agent_status"]
                        });
                    }
                    BookingFlightModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func3);
            }
            
            if(typeof(data["booking_hotel"]) != "undefined" && data["booking_hotel"]){
                var func4 = function(result,callback){
                    var iData = new Array();
                    for(var key in data["booking_hotel"]){
                        iData.push({
                            "booking_hotel_id":data["booking_hotel"][key]["booking_hotel_id"],
                            "total_price":data["booking_hotel"][key]["total_price"],
                            "average_price":data["booking_hotel"][key]["average_price"],
                            "agent_status":data["booking_hotel"][key]["agent_status"]
                        });
                    }
                    BookingHotelModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func4);
            }
            
            if(typeof(data["booking_option"]) != "undefined" && data["booking_option"]){
                var func5 = function(result,callback){
                    var iData = new Array();
                    for(var key in data["booking_option"]){
                        iData.push({
                            "booking_option_id":data["booking_option"][key]["booking_option_id"],
                            "total_price":data["booking_option"][key]["total_price"],
                            "average_price":data["booking_option"][key]["average_price"],
                            "agent_status":data["booking_option"][key]["agent_status"]
                        });
                    }
                    BookingOptionModel.doUpdate(conn,iData,function(res){
                        callback(null,res);
                    });
                };
                func.push(func5);
            }
        }else{
             var func1 = function(callback){
                 callback(null,{"result":{"code":1,"msg":"Authentication Error"}});
             };
             func.push(func1);
        }
        return func;
    }
}

module.exports = function(){return new BookingClass();};