var Model1 = require("../../libs/Model1");
class BookingOptionModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking_option";
        this.primary_key = "booking_option_id";
    }
}
module.exports = function(){return new BookingOptionModel();};
