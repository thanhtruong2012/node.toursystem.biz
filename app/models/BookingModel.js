var Model1 = require("../../libs/Model1");
class BookingModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking";
        this.primary_key = "booking_id";
    }
    doRefreshPrice(conn,data,callback){
        var sql = "CALL sp_booking_refresh_price(?);";
        var arr = [data.booking_id];
        this.doExecuteQuery(conn,sql,arr,null,callback,"storeOne");
    }
}
module.exports = function(){return new BookingModel();};
