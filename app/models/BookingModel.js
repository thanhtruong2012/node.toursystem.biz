var Model1 = require("../../libs/Model1");
class BookingModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking";
        this.primary_key = "booking_id";
    }
}
module.exports = function(){return new BookingModel();};
