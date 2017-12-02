var server = require('../app');
var mysql = require('mysql');

// DB CONNECTION
//Put your mysql configuration settings - user, password, database and port
function getConnection(){
    var connection = mysql.createPool({
        //details
        connectionLimit : 100,
        host : 'localhost',
        user : 'root',
        password : 'Pass@1234',
        database : 'kayak',
        port	 : 3306
    });
    console.log('connected');
    return connection;
}


function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection=getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}






function putdata(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	


exports.fetchData=fetchData;
exports.putdata=putdata;



