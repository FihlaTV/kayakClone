// DB SERVICES

var server = require('../app');
var mysql = require('./mysql-connection');

function getUserInfo(req,res)
{
    var getUserInfo = "SELECT * FROM kayak.userinfo";
    console.log("Query is:"+getUserInfo);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){

                var rows = results;
                var jsonString = JSON.stringify(results);
                var jsonParse = JSON.parse(jsonString);

                console.log("Results: "+(results));

                console.log("Results Stringify:"+(jsonString));
                console.log("Results Parse:"+(jsonParse));
            }
            else {

                console.log("No users found in database");

            }
        }
    },getUserInfo);
}

exports.getUserInfo=getUserInfo;