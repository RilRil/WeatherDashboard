// ALL ROUTES HERE

// Index route
// Just rendering the index page HTML here, we'll get the weather infos via AJAX
exports.index = function(req, res){
    res.render('index.jade');
};

// Settings Route
// just rendering the settings page HTML
exports.settings = function(req, res){
	res.render('settings.jade');
};


// Add a widget 
// use city's unique ID , make an API call to get its infos and store them with LocalStorage (JSON files)
exports.add = function(req, res) {
	var id      = req.params.cityId;
	var code    = 200;
	var msg     = "";
	var cities  = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);
	var request = require('request');


  // API call to OpenWeatherMap using city's unique ID
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
    // once the API call is done we render the HTML
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
// remove city infos from LocalStorage
exports.delete = function(req, res) {
	var id      = req.params.cityId;
	var cities  = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

	cities.splice(id, 1);
	localStorage.setItem("cities", JSON.stringify(cities));
	cities = (JSON.parse(localStorage.getItem("cities")) !== null ? JSON.parse(localStorage.getItem("cities")) : []);

  // render HTML
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

  // render HTML
	res.render('settings.jade', {
		locals : {
			cities : cities
		}}
	);
};