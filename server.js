var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config'); // get our config file

var app = new express();


//app.set('secret', config.secret);// secret variable
//environment

var port = process.env.PORT || 8000
mongoose.connect(config.database);// connect to database


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//app.use('/api/users',require('./app/user'));
require('./routes')(app);

app.listen(port, function () {
    console.log("server listening on port 8000");
})

module.exports = app;