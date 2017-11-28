var Model1 = require("../../libs/Model1");
class BookingHistModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking_hist";
        this.primary_key = "booking_hist_id";
    }
}
module.exports = function(){return new BookingHistModel();};
