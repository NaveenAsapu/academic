
var express       = require('express'),
    path          = require('path'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    passport      = require('passport'),
    mongoose      = require("mongoose"),
    CONFIG        = require('./config/CONFIG.js');
var flash    = require('connect-flash');

var app = express();

/**
 * MongoDB connection initializaion
 **/
mongoose.connect(CONFIG.DB_URL,function(err,result){
    if(err){
        console.log('error',err);
    }
});

/**
 middlewares Body parser (parse json object from a request)
 */

app.use(bodyParser.urlencoded({  extended: true }));
app.use(bodyParser.json({limit: '5mb'}));


/**
 cookie parser middle (parse cookie values from a request)
 */
app.use(cookieParser('my secret here'));

/**
 Session middleware with secret with the session cookie expire time
 */
app.use(session({secret: 'asdfkjapwoeiuavweur', cookie: {maxAge: 50000000}, resave: true, saveUninitialized: true}));

/**
 Authentication middleware (Authenticate email and password)
 */
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//mongoose.connect("mongodb://localhost/news");

app.use('/app', express.static(path.join(__dirname, '/app'), {maxAge: 10 * 1000}));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components'), {maxAge: 10 * 1000}));


try{
      require('./routes/index')(app,passport);


      app.listen(CONFIG.PORT, function(){
              console.log('Server Listening in port ', CONFIG.PORT);
          });

}
catch(e){
    console.log('error to listen port - ', e);
}
