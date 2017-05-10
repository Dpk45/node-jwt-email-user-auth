

var path=require('path');


module.exports= function(app){

app.use('/api/users',require('./app/user'));

}