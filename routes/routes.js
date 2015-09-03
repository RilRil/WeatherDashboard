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
