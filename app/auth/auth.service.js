var User = require("../user/user.model");
var jwt = require('jsonwebtoken');
var config = require('../../config');



//user login authentication 
module.exports.authenticateUser = function (req, res) {
    console.log(req.body.email)
    User.findOne({
        email:req.body.email
    }, function (err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json({ success: false, message: 'authentication failed.user not found' })
        }
        else if (user) {
            //Check for password matches
            user.comparePassword(req.body.password,function(err,isMatch){
                if(err)
                return err;

                if(isMatch){
                       var token = jwt.sign(user, config.secret,
                              {
                              expiresIn: 60 * 60 * 5
                                }
                         )
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'enjoy your token',
                token: token
            })
                }
            });

        
        }
    })}

    module.exports.authUserRoutes=function(req,res,next){
        // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }});}
    }
