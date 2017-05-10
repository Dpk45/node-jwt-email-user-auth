var express=require('express');
var router=express.Router();
var controller=require("./user.controller");
var auth=require('../auth/auth.service');



router.post('/loginAuth',auth.authenticateUser);
router.post('/register',controller.register);
router.get('/verify',controller.verifyUser);
//middleware
//router.use(auth.authUserRoutes);
    
router.get('/',controller.getUser);
//router.post('/forgot',controller.forgotPwd)

module.exports=router;