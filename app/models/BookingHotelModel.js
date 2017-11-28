var Model1 = require("../../libs/Model1");
class BookingHotelModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking_hotel";
        this.primary_key = "booking_hotel_id";
    }
}
module.exports = function(){return new BookingHotelModel();};
