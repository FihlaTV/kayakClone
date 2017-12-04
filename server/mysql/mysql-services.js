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
                    callback(err, results);
                }
            });
        }

    });

}
function insertData(callback,sqlQuery){
    
        console.log("\nSQL Query::"+sqlQuery);
        var connection=mysql.getConnection();
        connection.getConnection(function(err,temp_connection){
            if(!err)
            {
                temp_connection.release();
                console.log("ERROR: " + err);
            }
            else
            {
                console.log('Connected');
    
                temp_connection.query(sqlQuery, function(err, rows, fields) {
                    if(err){
                        console.log("ERROR: " + err.message);
                    }
                    else
                    {  // return err or result
                        console.log("DB Results:"+rows);
                        callback(err, rows);
                    }
                });
            }
    
        });
    }


function putdata(req,res)
{
	
 
  var putdata ="  INSERT INTO `kayak`.`flightbookingdetails` (`email`, `bookingid`, `tripid`, `flightsource`, `flightdestination`, `flightbaseprice`, `flighttotalprice`, `flightpassengerdateofbirth`, `flightpassengerfirstname`, `flightpassengerlastname`, `flightpassengergender`, `journeydate`, `flightid`, `airlines`, `flightclass`) VALUES ('sal', '123', '123', 'boston', 'phl', '300', '330', '02/02/1995', 'salauni', 'patel', 'female', '01/01/2018', '123', 'southwest', 'first')";

	console.log("Query is:"+putdata);
	mysql.putdata(function(err,result){
		if(err){
		throw err;	
		}
		else{
		console.log(putdata);
		}
	
	   },putdata);
    }


exports.getUserInfo=getUserInfo;
exports.putdata=putdata;
exports.insertData=insertData;
