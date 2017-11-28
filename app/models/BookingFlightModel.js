var Model1 = require("../../libs/Model1");
class BookingFlightModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking_flight";
        this.primary_key = "booking_flight_id";
    }
}
module.exports = function(){return new BookingFlightModel();};
