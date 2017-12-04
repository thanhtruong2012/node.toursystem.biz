var Model1 = require("../../libs/Model1");
class BookingAgentModel extends Model1{
    constructor() {
        super();
        this.table_name = "nbooking_agent";
        this.primary_key = "booking_id";
    }
}
module.exports = function(){return new BookingAgentModel();};
