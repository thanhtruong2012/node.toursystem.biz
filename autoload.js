var fs = require('fs');
module.exports = function(app,io){
	// dynamically include routes (Controller)
	fs.readdirSync('./app/controllers').forEach(function (file) {
	  if(file.substr(-3) == '.js') {
		  route = new require('./app/controllers/' + file)(app,io);
	  }
	});
};



