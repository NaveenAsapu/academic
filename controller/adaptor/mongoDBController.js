/**
 * Created by lenovo on 5/15/2016.
 */
var model = require('../../models/mongoDBConnection.js');
function GetDocument(db_name,query,projection,options,callback){
    model[db_name].find(query,projection, options, function (err, docs) {
            callback(err, docs)
    });
}

function InsertDocument(db_name,data,callback){

    var InsertData = new model[db_name](data);

//save model to MongoDB
    InsertData.save(function (err,response) {
        callback(err,response)
    });
}

module.exports = {
  GetDocument:GetDocument,
    InsertDocument:InsertDocument
};