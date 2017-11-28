var Model1 = require("../../libs/Model1");
class AgentModel extends Model1{
    constructor() {
        super();
        this.table_name = "agent";
        this.primary_key = "agent_id";
    }
}
module.exports = function(){return new AgentModel();};
