var path    = require('path');
var CONFIG  = require('../config/config.js');

function isAuth(req, res, next) {
    try {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.send({ "auth": "authentication error"});
        }
    }
    catch (ex) {
        console.log("error authentication", ex);
    }
}


module.exports = function (app, passport) {

    try {
        require('./auth.js')(passport);

        app.get('/',function(req,res){
            res.sendFile(path.join(__dirname, '../app/index.html'));
        });


        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/admin', // redirect to the secure profile section
            failureRedirect : '/logout', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/admin', // redirect to the secure profile section
            failureRedirect : '/logout', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/admin',function(req,res){
            console.log('ssssss',req.session);
            /*res.cookies('username',req.session.passport);*/
            res.cookie("name" , req.session.passport.user);
            res.send({username:req.session.passport.user.username,password:req.session.passport.user.password});
        });

        app.get('/logout',function(req,res){
            console.log('logout---',req.session);
            res.status(202).send({msg:req.session.flash.signupMessage[0]});
        });
        
        app.use('/user', require('../controller/users.js'));
  
  
    } catch (e) {
        console.log("router error -->", e);
    }
};