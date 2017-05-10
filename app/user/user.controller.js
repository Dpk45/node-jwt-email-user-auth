
var User = require("./user.model");
var jwt = require('jsonwebtoken');
var config = require('../../config');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


//var async=require("async");
//var rand=Math.floor((Math.random() * 100) + 54);
 var mailOptions,link,token;

// nev.configure({
//     verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
//     persistentUserModel: User,
//     tempUserCollection: 'myawesomewebsite_tempusers',
 
//     transportOptions: {
//         service: 'Gmail',
//         auth: {
//             user: 'myawesomeemail@gmail.com',
//             pass: 'mysupersecretpassword'
//         }
//     },
//     verifyMailOptions: {
//         from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
//         subject: 'Please confirm account',
//         html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
//         text: 'Please confirm your account by clicking the following link: ${URL}'
//     }
// }, function(error, options){
// });


// nev.generateTempUserModel(User);

// var TempUser = require('./app/tempUserModel');
// nev.configure({
//     tempUserModel: TempUser
// }, function(error, options){
// });




// get user details
module.exports.getUser = function (req, res) {

    return User.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(data);
        }
    });
}

//post user
module.exports.register = function (req, res) {
 
     newUser = new User(req.body);
    newUser.role="user";
   // console.log(newUser);
   token = jwt.sign(newUser,config.secret,
                              {
                              expiresIn: 60 * 60 * 5
                                }
                         );

console.log(token+'nnnnnnnnnnnnnnnnnnnnnnnnnddddddddddddddddd');
    let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'dpkchauhan1994@gmail.com',
        pass: 'iitjee2012'
    }
}));
 console.log(token);
console.log("........."+req.headers.host);
   host=req.headers.host;
    link="http://"+req.headers.host+"/api/users/verify?id="+token;
    mailOptions={
            //to:"dpkchauhan1994@gmail.com",
         to : req.body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
   // console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
       console.log(response+".......");
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
})
}

module.exports.verifyUser=function(req,res){
           console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    //console.log(req.query.id);
    if(req.query.id==token)
    {
            newUser.save(function (err, user) {
        if (err) {
            throw err;
        }
        // else {
        //  // res.json(user);
        // }
    });
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        //console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}                   
}
// module.exports.forgotpwd=function(req,res,next){
// async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       User.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(422).json({'message': 'No account with that email address exists.'});
//         }
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//         user.save(function(err) {
//           done(err, token, user);
//         });
//       });
//     },
//     function(token, user, done) {
//       // req.body.headers =  req.headers
//       req.body.to = user.email
//       req.body.host = req.headers.host
//       req.body.token =  token
//       mailer.send(config.mailOptions.forgotPassword(req.body))
//       return res.status(201).json({'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@demo.com',
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//         done(err, 'done');
//       });
//     }
//   ], function(err) {
//     if (err) return next(err);
//     res.redirect('/forgot');
//   });
//}


