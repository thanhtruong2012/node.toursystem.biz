var Model1 = require("../../libs/Model1");
class BookingGuestModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking_guest";
        this.primary_key = "booking_guest_id";
    }
}
module.exports = function(){return new BookingGuestModel();};
