// This file handles the configuration of the app.
// It is required by app.js

var express = require('express');

module.exports = function(app, io){

	// Set .ejs as the default template extension
	app.set('view engine', 'ejs');

	// Initialize the ejs template engine
	app.engine('ejs', require('ejs').renderFile);

	// Tell express where it can find the templates
	app.set('views', __dirname + '/app/views');

	// Make the files in the public folder available to the world
	app.use(express.static(__dirname + '/public'));

};
