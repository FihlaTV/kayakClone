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



function putdata(req,res)
{
	
//var putdata="INSERT INTO userdata (`firstName`,`lastName`,`username`,`password`,`birthDate`) VALUES ('"+req.param("firstname")+"','"+req.param("lastname")+"','"+req.param("Username")+"','"+req.param("Password")+"','"+req.param("birthdate")+"')";
      
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