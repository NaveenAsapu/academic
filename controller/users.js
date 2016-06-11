var express = require('express');
var router = express.Router();
var db = require('./adaptor/mongoDBController.js');
var xlsxj = require("xlsx-to-json");
var js2xmlparser = require("js2xmlparser");
var fs = require('fs');
var path = require('path');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../upload'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var storageJSON = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../JSON'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var uploaded = multer({ storage: storage });
var uploadedJOSN = multer({ storage: storageJSON });
/*var uploaded = multer({ dest: 'upload/' });*/


router.get('/listofdoc',  function (req, res) {

    db.GetDocument('data',{},{},{},function(err,respo){
        console.log('dddddddddddd',err,respo);
        if(err){
            res.send(err);
        }else{
            res.send(respo);
        }
    });
});

router.get('/listofxml',  function (req, res) {

    fs.readdir(path.join(__dirname,'../XML/'), function(err, files) {

        console.log();
        if (err) res.send(0);
console.log(files.length);
       /* var obj = JSON.parse(files);*/
        res.send(files);
        /*files.forEach(function(f) {
         console.log('Files: ' + f);
         });*/
    });
});

router.get('/listofjson',  function (req, res) {

    fs.readdir(path.join(__dirname,'../JSON/'), function(err, files) {
        if (err)  res.send(0);
console.log('files',files);
      /*  var obj = JSON.parse(files);*/
        res.send(files);
        /*files.forEach(function(f) {
         console.log('Files: ' + f);
         });*/
    });
});
// define the home page route
router.post('/xlsxtojson',uploaded.single('file'), function(req, res) {

    var data = {};
    xlsxj({
        input: req.file.path,
        output: 'output/'+Date.now()+".json"
    }, function(err, result) {
        if(err) {
            console.error(err);
        }else {
            data.document_name = req.body.username;
            data.data = result;
            db.InsertDocument('data',data,function(err,respo){
                console.log(result,"--------",respo);
                if(err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            });
        }
    });

});

router.post('/jsontoxml',uploadedJOSN.single('file'), function(req, res) {


    var data = {
        "firstName": "John",
        "lastName": "Smith",
        "nicknames": [
            "Johnny",
            "Jon",
            "Jack"
        ]
    };

    var options = {
        arrayMap: {
            nicknames: "name"
        }
    };

    fs.readFile(req.file.path,'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log('object',data);

        for(var i=0;i<obj.length;i++){
            fs.writeFile(path.join(__dirname,'../XML/'+Date.now()+i+'.xml'), js2xmlparser("person", obj[i], options), function (err) {
                if (err) return console.log(err);
                console.log('Hello World > helloworld.txt');
            });
        }

        fs.readdir(path.join(__dirname,'../XML/'), function(err, files) {
            if (err) return;
            res.send(files);
            /*files.forEach(function(f) {
                console.log('Files: ' + f);
            });*/
        });


    });

    console.log(js2xmlparser("person", data, options));



});

module.exports = router;