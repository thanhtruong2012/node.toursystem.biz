var Model1 = require("../../libs/Model1");
class BookingEmailModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking_email";
        this.primary_key = "booking_email_id";
    }
}
module.exports = function(){return new BookingEmailModel();};
