// ALL ROUTES HERE



// Index route
exports.index = function(req, res){
		
	var cities  = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

		if (cities.length > 0) {
			res.render('index.jade', {
				locals : {
					cities : cities
				}
			});
		} else {
			// No cities saved
			res.render('nocities.jade');
		}
};



exports.settings = function(req, res){

	var cities  = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

	res.render('settings.jade', {
		locals : {
			cities : cities
		}}
	);

};


// Add a widget 
exports.add = function(req, res) {
	var id      = req.params.cityId;
	var code    = 200;
	var msg     = "";
	var cities  = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);
	var request = require('request');

	request('http://api.openweathermap.org/data/2.5/weather?units=metric&id='+id, function (error, response, body) {
		if (!error && response.statusCode == 200) {

			if (body.cod != 404) {
				cities.push(JSON.parse(body));
				localStorage.setItem("cities", JSON.stringify(cities));
				cities = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

			} else {
				code = 404;
				msg  = body.message;	
			}
		} else {
			code = 404;
			msg  = "An error occurred.";
		}
		res.render('settings.jade', {
			locals: {
				code : code,
				msg : msg,
				cities : cities
			}
		});
	});


};


// Delete a widget
exports.delete = function(req, res) {
	var id      = req.params.cityId;
	var cities  = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

	console.log(cities);
	cities.splice(id, 1);
	localStorage.setItem("cities", JSON.stringify(cities));
	cities = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

	res.render('settings.jade', {
		locals: {
			cities : cities
		}
	});


};

// Delete all widgets
exports.deleteall = function(req, res) {
	localStorage.removeItem("cities");
	var cities  = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

	res.render('settings.jade', {
		locals : {
			cities : cities
		}}
		);
};