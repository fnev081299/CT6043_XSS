var express = require('express');
var session = require('express-session');
var serverStatic = require('serve-static');
var app = express();

// This serves the index.html
app.use(serverStatic(__dirname + '/public'));

// Sessions remember data about specific users.
// For example when you login to a website, it remembers you for the time being.
app.use(session({
	secret: 'a secrete',
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: false,
		secure: false
	}
}));

// Start listening to requests at port 3000.
app.listen(3000, function() {
	console.log('Server at localhost:3000');
});
