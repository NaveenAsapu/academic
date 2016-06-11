/**
 * Created by lenovo on 5/15/2016.
 */
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    pnumber:String,
    document_name:String,
    data:[]
});

var dataSchema = mongoose.Schema({
    document_name:String,
    data:[]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var users = mongoose.model('users', userSchema,'users');
var data = mongoose.model('data', dataSchema,'data');

// create the model for users and expose it to our app
module.exports ={
  'users':users,
  'data':data
};