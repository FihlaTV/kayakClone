var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysqldbservice = require('./mysql/mysql-services');
var mysql = require('mysql');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// MOngo Connection

app.listen(3001, function() {
    console.log('listening on 3000')
  })

var db
MongoClient.connect('mongodb://kayak:kayak273@ds259175.mlab.com:59175/kayak', (err, database) => {
    // ... start the server
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  })



 //FLIGHT APIs
  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
  })

  app.post('/booking',mysqldbservice.putdata);


  app.get('/listofflights', (req, res) => {
    db.collection('flightsData').find().toArray(function(err, results) {
        console.log(results)
       
      })
  })



/*
 app.get('/search', (req, res) => {
    // var cursor = db.collection('quotes').find()
     db.collection('flightsData').find({"destination":"Boston", "Date": "2017-11-01", "source": "Phoenix"}).toArray(function(err, results) {
         console.log(results)
         // send HTML file populated with quotes here
       })
   })
*/
 app.post('/searchflights', (req, res) => {
    
   var destination= req.body.destination;
    var date= req.body.date;
    var source= req.body.source;
    
    console.log(req.body)
    console.log(destination)
    console.log(req.body.destination)
 /*
    var flightdata = {
        "destination":req.body.destination,
        "Date":req.body.date, 
        "source":req.body.source
    };

 console.log(flightdata)
*/
   // db.collection('flightsData').find(flightdata).toArray(function(err,results){

    db.collection('flightsData').find({"destination" : destination, "source" : source, "Date": date }).toArray(function(err, results) {
         console.log(results);
          
       })
   });


   app.post('/searchhotels', (req, res) => {
   
    var roomtype= req.body.roomtype;
   var hoteladdress= req.body.hoteladdress;
    console.log(roomtype)
    console.log(req.body)
   
    db.collection('hotels').find({"hoteladdress" : hoteladdress, "roomtype" : roomtype}).toArray(function(err, results) {
        console.log(results);
         
      })
  });

 
    

   app.post('/user_cc_details',function(req,res){
    
        var cardnumber = req.body.cardnumber;
       
        console.log(req.body);
    
    });

   app.post('/flightdetails', (req, res) => {
    
    var destination= req.body.destination;
    var date= req.body.date;
    var source= req.body.source;
    var flightname=req.body.flightname;

     db.collection('flightsData').findOne({"destination":destination, "Date": date, "source": source, "fligtName": flightname},function(err, results) {
         console.log(results)

       })
   })


   app.post('/hoteldetails', (req, res) => {
    
    var roomtype= req.body.roomtype;
    var hoteladdress= req.body.hoteladdress;
    var hotelname=req.body.hotelname;

     console.log(roomtype)
     console.log(req.body)

     db.collection('hotels').findOne({"hoteladdress" : hoteladdress, "roomtype" : roomtype, "hotelname": hotelname},function(err, results) {
         console.log(results)

       })
   })



   
   app.post('/searchcar', (req, res) => {
    
    var cartype= req.body.cartype;
    var pickupcity= req.body.pickupcity;
    
     console.log(cartype)
     console.log(req.body)

     db.collection('cars').findOne({"pickupcity" : pickupcity, "cartype" : cartype},function(err, results) {
         console.log(results)

       })
   })


   
   app.post('/cardetails', (req, res) => {
    
    var cartype= req.body.cartype;
    var pickupcity= req.body.pickupcity;
    var carbrand=req.body.carbrand;
     console.log(cartype)
     console.log(req.body)

     db.collection('cars').findOne({"pickupcity" : pickupcity, "cartype" : cartype, "carbrand": carbrand},function(err, results) {
         console.log(results)

       })
   })

   app.get('/detailstest', details, function(req,res){
    db.collection('flightsData').findOne({"destination":"Boston", "Date": "2017-11-01", "source": "Phoenix", "fligtName": "Virgin America"},function(err, results) {
        console.log( results)
        res.send (results.toString())
       /*
        var rows=results;
        var jsonString= JSON.stringfy(results);
        res.send (jsonString) 
        */ 
    })
   })


function details(req, res, next){
   
    console.log("results are:" + results)

}

  app.get('/details1', (req, res) => {
      console.log("results are:" + results);
  })


   app.get('/userinfo',mysqldbservice.getUserInfo)

   //flight booking page APIs
