//require modules
var express = require('express'),
    app = express(),
    port = 3030,
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger());
app.use(bodyParser());
app.use(stylus.middleware({
    src: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(port);
console.log('Listening on port...' + port);