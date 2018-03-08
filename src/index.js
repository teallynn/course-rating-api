'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var jsonParser = require('body-parser').json;
var routes = require('./routes/api')
var app = express();
var mongoose = require('mongoose');
var seeder = require('mongoose-seeder');
var data = require('./data/data.json');

mongoose.connect('mongodb://localhost:27017/apidb')
  .then(function() {
      var db = mongoose.connection;
      console.log('db connection successful');
      seeder.seed(data).then(function(dbData) {
          console.log('db has been seeded')
      }).catch(function(err) {
          console.log(err);
      });
  }, function(err) {
      console.error('connection error:', err);
  });

// set our port
app.set('port', process.env.PORT || 5000);

// use morgan as a logger
app.use(morgan('dev'));

// jsonParser parses the request body
app.use(jsonParser());

// set views engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// include routes
app.use('/api', routes);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
