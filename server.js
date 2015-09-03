
//setup Dependencies

var connect = require('connect'),
    express = require('express'),
    port = (process.env.PORT || 8081),
    routes = require('./routes/routes.js');

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(express.static(__dirname + '/static'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { 
          locals: { 
            title : '404 - Not Found',
            description: '',
            author: ''
          },
          status: 404 }
        );

    } else {
        res.render('500.jade', { 
          locals: { 
            title : 'The Server Encountered an Error',
            description: '',
            author: '',
            error: err 
          },
          status: 500 }
        );
    }
});

server.listen( port);


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

server.post('/',routes.index);

server.get('/', routes.index);
server.get('/settings', routes.settings);


//A Route for Creating a 500 Error
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

server.get('/504', function(req, res){
    throw new Error('This is a 504 Error');
});

//The 404 Route
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
