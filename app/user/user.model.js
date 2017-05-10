var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;



var UserSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    email: { type: String, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    active: { type: Boolean, default: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date
    // admin:Boolean
});


/*-------password encryption code ---------------*/


UserSchema.pre('save', function (next) {
    var user = this;
    //only hash the passowrd if it has been modified (Or is new)
    if (!user.isModified('password'))
        return next();
    //generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);

        //hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            //console.log(hash);
            //override the clear text password with hashed one
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = function (userPassword, callback) {
    bcrypt.compare(userPassword, this.password, function (err, isMatch) {
        if (err)
            return err;
        callback(null, isMatch);
    })
}

/*---------------------------------------------------------*/











module.exports = mongoose.model('User', UserSchema);
