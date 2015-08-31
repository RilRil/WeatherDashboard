exports.getthetreasures = function(req, res){
	res.render('getthetreasures.jade');

};

exports.index = function(req, res){
	var formEmail = req.body.email;
	console.log("body "+formEmail);

	if (formEmail !== undefined) {
		var MailChimpAPI = require('mailchimp').MailChimpAPI;
		var apiKey       = '1efa1fef32d11707cf0e38a2eb2f7d0c-us8';

		try { 
			var api = new MailChimpAPI(apiKey, { version : '2.0' });

			api.call('lists', 'subscribe', { id: "c4bf5e880e", email: {email : formEmail} }, function (error, data) {
				if (error)
					console.log(error.message);
				else
				console.log(JSON.stringify(data)); // Do something with your data!
		});

		} catch (error) {
			console.log(error.message);
		}
	} else {
		console.log("No email");
	}



 res.render('index.jade', {
    locals : {
              title : 'Tilt' ,
              description: 'Tilt' ,
              author: 'Tilt team',
              analyticssiteid: 'XXXXXXX'
            }
  });
};

exports.newslettersubscribe = function(req, res){

	

 res.render('index.jade', {
    locals : {
              title : 'Tilt' ,
              description: 'Tilt' ,
              author: 'Tilt team',
              analyticssiteid: 'XXXXXXX'
            }
  });
};



exports.aboutus = function(req, res){
 res.render('about/us.jade', {
    locals : {
              title : 'About Us - Tilt' ,
              description: 'Tilt' ,
              author: 'Tilt team',
              analyticssiteid: 'XXXXXXX'
            }
  });
};

exports.aboutterms = function(req, res){
 res.render('about/terms.jade', {
    locals : {
              title : 'Terms of Use - Tilt' ,
              description: 'Tilt' ,
              author: 'Tilt team',
              analyticssiteid: 'XXXXXXX'
            }
  });
};

exports.aboutprivacy = function(req, res){
 res.render('about/privacy.jade', {
    locals : {
              title : 'Privacy Policy - Tilt' ,
              description: 'Tilt' ,
              author: 'Tilt team',
              analyticssiteid: 'XXXXXXX'
            }
  });
};


exports.aboutlicenses = function(req, res){
 res.render('about/licenses.jade', {
    locals : {
              title : 'Licenses - Tilt' ,
              description: 'Tilt' ,
              author: 'Tilt team',
              analyticssiteid: 'XXXXXXX'
            }
  });
};



exports.post = function(req, res){

	var Kaiseki = require('kaiseki');

	// prod
	var APP_ID = 'tGziTmgh12mkY3XaKcWrRest6fVRDGmWDEUvdJlX';
	var REST_API_KEY = '40vFVeha0pY0VOerPGImEQC1ehsK37VnhrpzuLnc';

	// dev
/*	var APP_ID = '4jXD624vj11bQaP4Gm7VVHjy4kbFaCvhCJEiGQv2';
	var REST_API_KEY = 'YCIEzNQLgUmSNDzyWTF7d96HyCtlVRGEwT19Ye6N';*/
	
	var kaiseki = new Kaiseki(APP_ID, REST_API_KEY);

	kaiseki.getObject('UserPhoto', req.params.postId, function(err, result, body, success) {
		if (!err) {
			var files = body.Files;
			var date = body.createdAt;
			var username = '';
			var caption = '';

			var locals = {
				title : 'Tilt',
				description: 'Tilt website',
				author: 'Tilt team',
				analyticssiteid: 'XXXXXXX',
				postId: req.params.postId,
				images : files,
				date : date,
				websiteUrl : 'a'+req.app.get('websiteUrl')
			};


			kaiseki.getUser(body.user, function(err, result, user, success) {
				if (success) {

					locals.username = user.username;
					locals.profilePic = user.profilePhoto ? user.profilePhoto.url : '';
					locals.twitterText = "A tilt photo by "+user.username+" via @tiltapp1";
					locals.postUrl = 'http://tilt.photos/p/'+req.params.postId


					if (body.haveCaption) {
						var params = {
							where : { post : req.params.postId },
							limit : 1
						};
						kaiseki.getObjects('PhotoComment', params, function(err, resultCom, comment, success) {
							if (success) {
								locals.caption = '"'+comment[0].Text+'"';

								res.render('post.jade', locals);
							}
						});
					} else {
						locals.caption = '';
						res.render('post.jade', locals);
					}
				}
			});
		} else {
			res.render('404.jade');
		}
		if (!success) {
			res.render('404.jade');			
		}
	});
};

exports.postsimple = function(req, res){

	var Kaiseki = require('kaiseki');

	// prod
	var APP_ID = 'tGziTmgh12mkY3XaKcWrRest6fVRDGmWDEUvdJlX';
	var REST_API_KEY = '40vFVeha0pY0VOerPGImEQC1ehsK37VnhrpzuLnc';

	// dev
/*	var APP_ID = '4jXD624vj11bQaP4Gm7VVHjy4kbFaCvhCJEiGQv2';
	var REST_API_KEY = 'YCIEzNQLgUmSNDzyWTF7d96HyCtlVRGEwT19Ye6N';*/
	
	var kaiseki = new Kaiseki(APP_ID, REST_API_KEY);

	kaiseki.getObject('UserPhoto', req.params.postId, function(err, result, body, success) {
		if (!err) {
			var files = body.Files;
			var date = body.createdAt;
			var username = '';
			var caption = '';

			var locals = {
				title : 'Tilt',
				description: 'Tilt website',
				author: 'Tilt team',
				analyticssiteid: 'XXXXXXX',
				postId: req.params.postId,
				images : files,
				date : date
			};

			kaiseki.getUser(body.user, function(err, result, user, success) {
				if (success) {

					locals.username = user.username;
					locals.profilePic = user.profilePhoto ? user.profilePhoto.url : '';
					locals.twitterText = "A tilt photo by "+user.username+" via @tiltapp1";
					locals.postUrl = 'http://tilt.photos/p/'+req.params.postId

					if (body.haveCaption) {
						var params = {
							where : { post : req.params.postId },
							limit : 1
						};
						kaiseki.getObjects('PhotoComment', params, function(err, resultCom, comment, success) {
							if (success) {
								locals.caption = '"'+comment[0].Text+'"';

								res.render('postsimple.jade', locals);
							}
						});
					} else {
						locals.caption = '';
						res.render('postsimple.jade', locals);
					}
				}
			});
		} else {
			res.render('404.jade');
		}
		if (!success) {
			res.render('404.jade');			
		}
	});
};


exports.embedpost = function(req, res){
			var locals = {
				title : 'Tilt',
				description: 'Tilt website',
				author: 'Tilt team',
				analyticssiteid: 'XXXXXXX',
				postId: req.params.postId,
				postUrl :'http://tilt.photos/p/'+req.params.postId
			};
			
			res.render('embedpost.jade', locals);
};




exports.remove = function(req, res){
 
	var Kaiseki = require('kaiseki');

	// prod
/*	var APP_ID = 'tGziTmgh12mkY3XaKcWrRest6fVRDGmWDEUvdJlX';
	var REST_API_KEY = '40vFVeha0pY0VOerPGImEQC1ehsK37VnhrpzuLnc';
*/
	// dev
	var APP_ID = '4jXD624vj11bQaP4Gm7VVHjy4kbFaCvhCJEiGQv2';
	var REST_API_KEY = 'YCIEzNQLgUmSNDzyWTF7d96HyCtlVRGEwT19Ye6N';

	var kaiseki = new Kaiseki(APP_ID, REST_API_KEY);

	var params = {
		limit : 1,
		order : '-createdAt'
	};
	kaiseki.getObjects('UserPhoto', params, function(err, res, body, success) {
		if (success) {
			console.log("okay obj "+JSON.stringify(body));
			kaiseki.deleteObject('UserPhoto', body[0].objectId, function(err, res, body, success) {
				if (success)
					console.log('deleted!');
				else
					console.log('failed!');
			});
		}
	});
};


