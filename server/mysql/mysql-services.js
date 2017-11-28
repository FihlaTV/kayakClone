// DB SERVICES

var server = require('../app');
var mysql = require('./mysql-connection');
/*
function getUserInfo(callback,sqlQuery)
{
    //var getUserInfo = "SELECT * FROM kayak.userinfo";
    console.log("Query is:"+sqlQuery);

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
    },sqlQuery);
}*/

var getUserInfo=function(callback,sqlQuery){
    var jsonString="";
    console.log("\nSQL Query::"+sqlQuery);

    var connection=mysql.getConnection();
    connection.getConnection(function(error,temp_connection){
        if(!!error)
        {
            temp_connection.release();
            console.log("ERROR: " + err.message);
        }
        else
        {
            console.log('Connected');

            temp_connection.query(sqlQuery, function(err, results, fields) {
                if(err){
                    console.log("ERROR: " + err.message);
                }
                else
                {
                    if(results.length > 0){

                        var rows = results;
                        jsonString = JSON.stringify(results);
                        var jsonParse = JSON.parse(jsonString);

                        console.log("Results: "+(results));

                        console.log("Results Stringify:"+(jsonString));
                        console.log("Results Parse:"+(jsonParse));
                    }
                    else {

                        console.log("No users found in database");

                    }
                }
            });
        }

    });
    return jsonString;
}
function insertData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);
    var connection=mysql.getConnection();
    connection.getConnection(function(error,temp_connection){
        if(!!error)
        {
            temp_connection.release();
            console.log("ERROR: " + err.message);
        }
        else
        {
            console.log('Connected');

            temp_connection.query(sqlQuery, function(err, rows, fields) {
                if(err){
                    console.log("ERROR: " + err.message);
                }
                else
                {	// return err or result
                    console.log("DB Results:"+rows);
                    callback(err, rows);
                }
            });
        }

    });
}

exports.getUserInfo=getUserInfo;
exports.insertData=insertData;
