/*
var Converter=require("csvtojson").Converter;
var fs = require('fs');
var columArrData=__dirname+"/data/columnArray";
var rs=fs.createReadStream(columArrData);
var result = {}
var csvConverter=new Converter();
//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed", function(jsonObj) {
    console.log(result);
    console.log("Finished parsing");
    done();
});

//record_parsed will be emitted each time a row has been parsed.
csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {

    for (var key in resultRow) {
        if (!result[key] || !result[key] instanceof Array) {
            result[key] = [];
        }
        result[key][rowIndex] = resultRow[key];
    }

});
rs.pipe(csvConverter);*/
/*
var Conv=require("csvtojson").Converter;
var async=require("async");
var rs=require("fs").createReadStream("data/columnArray"); // or any readable stream to csv data.
var q=async.queue(function(json,callback){
    //process the json asynchronously.
    require("request").get("http://myserver/user/"+json.userId,function(err,user){
        //do the data mash here
        json.user=user;
        callback();
    });
},10);//10 concurrent worker same time
q.saturated=function(){
    rs.pause(); //if queue is full, it is suggested to pause the readstream so csvtojson will suspend populating json data. It is ok to not to do so if CSV data is not very large.
}
q.empty=function(){
    rs.resume();//Resume the paused readable stream. you may need check if the readable stream isPaused() (this is since node 0.12) or finished.
}
var conv=new Conv({construct:false});
conv.transform=function(json){
    q.push(json);
};
conv.on("end_parsed",function(){
    q.drain=function(){
        //code when Queue process finished.
    }
})
rs.pipe(conv);*/
/*
xlsxj = require("xlsx-to-json");
xlsxj({
    input: "data/columnArray/sample.xlsx",
    output: "output.json"
}, function(err, result) {
    if(err) {
        console.error(err);
    }else {
        console.log(result);
    }
});*/
var js2xmlparser = require("js2xmlparser");
var fs = require('fs');

/*
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

console.log(js2xmlparser("person", data, options));

fs.writeFile('helloworld.xml', js2xmlparser("person", data, options), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
});*/



/*
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];

fs.readdir(path, function(err, items) {
    console.log(items);

    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
});*/
fs.realpath(__dirname, function(err, path) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Path is : ' + path);
});
fs.readdir(__dirname +'/upload', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
        console.log('Files: ' + f);
    });
});
