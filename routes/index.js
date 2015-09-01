// ALL ROUTES HERE



// Index route
exports.index = function(req, res){
 res.render('index.jade', {
    locals : {
              title : 'Weather Dashboard' ,
              author: 'Cyril Maurel',
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



