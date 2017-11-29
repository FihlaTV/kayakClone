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


//user_cc_details
var user_cc_details=function(callback,sqlQuery){
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
                        callback(err, jsonString);
                    }
                    else {

                        console.log("No users found in database");
                        callback(err, null);
                    }
                    console.log("json:"+jsonString);
                    //return (jsonString);

                }

            });
        }
    });
    //return (jsonString);
}




//admin: FLIGHT REVENU BY CITY
var flight_revenue_by_src=function(callback,sqlQuery){
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
                        console.log("Results Stringify flights for admin:"+(jsonString));
                        console.log("Results Parse:"+(jsonParse));
                    }
                    else {
                        console.log("No flights found");
                    }
                    console.log("json:"+jsonString);
                    callback(err, jsonString);
                }
            });
        }
    });
}


//admin: CAR REVENU BY CITY
var car_revenue_by_city=function(callback,sqlQuery){
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
                        console.log("Results Stringify CARS for admin:"+(jsonString));
                        console.log("Results Parse:"+(jsonParse));
                    }
                    else {
                        console.log("No flights found");
                    }
                    console.log("json:"+jsonString);
                    callback(err, jsonString);
                }
            });
        }
    });
}


//admin: HOTEL REVENU BY CITY
var hotel_revenue_by_city=function(callback,sqlQuery){
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
                        console.log("Results Stringify HOTEL for admin:"+(jsonString));
                        console.log("Results Parse:"+(jsonParse));
                    }
                    else {
                        console.log("No hotel_revenue_by_city found");
                    }
                    console.log("json:"+jsonString);
                    callback(err,  );
                }
            });
        }
    });
}



//admin: top_five_flights
var top_five_flights=function(callback,sqlQuery){
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
                        console.log("Results Stringify HOTEL for admin:"+(jsonString));
                        console.log("Results Parse:"+(jsonParse));
                    }
                    else {
                        console.log("No top_five_flights found");
                    }
                    console.log("json:"+jsonString);
                    callback(err, jsonString);
                }
            });
        }
    });
}


//admin: top_five_flights
var top_five_hotels=function(callback,sqlQuery){
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
                        console.log("Results Stringify HOTEL for admin:"+(jsonString));
                        console.log("Results Parse:"+(jsonParse));
                    }
                    else {
                        console.log("No top_five_flights found");
                    }
                    console.log("json:"+jsonString);
                    callback(err, jsonString);
                }
            });
        }
    });
}


//admin: top_five_flights
var top_five_cars=function(callback,sqlQuery){
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
                        console.log("Results Stringify HOTEL for admin:"+(jsonString));
                        console.log("Results Parse:"+(jsonParse));
                    }
                    else {
                        console.log("No top_five_flights found");
                    }
                    console.log("json:"+jsonString);
                    callback(err, jsonString);
                }
            });
        }
    });
}



exports.getUserInfo=getUserInfo;
exports.user_cc_details=user_cc_details;
exports.flight_revenue_by_src=flight_revenue_by_src;
exports.car_revenue_by_city=car_revenue_by_city;
exports.hotel_revenue_by_city=hotel_revenue_by_city;
exports.top_five_flights=top_five_flights;
exports.top_five_hotels=top_five_hotels;
exports.top_five_cars=top_five_cars;


//exports.flight_trip_details=flight_trip_details;
