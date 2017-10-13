var pool = require('../database').db("apiconnect_chatserver");
var pool1 = require('../database').db("apiconnect_main");
class Model {
	constructor() {
		this.pool = pool;
                this.pool1 = pool1;
	}
}
module.exports = Model;
