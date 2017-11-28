var express = require('express');
const bodyParser= require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysqldbservice = require('./mysql/mysql-services');
var mysql = require('mysql');
var ObjectId = require('mongodb').ObjectID;
var urlencodedPraser=bodyParser.urlencoded({extended:false});
var status;

app.use(express.bodyParser());

app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

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

  app.get('/list', (req, res) => {
   // var cursor = db.collection('quotes').find()
    db.collection('flightsData').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here
      })
  })

 app.get('/search', (req, res) => {
    // var cursor = db.collection('quotes').find()
     db.collection('flightsData').find({"destination":"Boston", "Date": "2017-11-01", "source": "Phoenix"}).toArray(function(err, results) {
         console.log(results)
         // send HTML file populated with quotes here
       })
   })

 app.get('/search', (req, res) => {
    // var cursor = db.collection('quotes').find()
     db.collection('flightsData').find({"destination":"Boston", "Date": "2017-11-01", "source": "Phoenix"}).toArray(function(err, results) {
         console.log(results)
         // send HTML file populated with quotes here
       })
   })

   app.get('/details', (req, res) => {
    // var cursor = db.collection('quotes').find()
     db.collection('flightsData').findOne({"destination":"Boston", "Date": "2017-11-01", "source": "Phoenix", "fligtName": "Virgin America"},function(err, results) {
         console.log(results)
         console.log(results._id)
       })
   })


   //app.get('/userinfo',mysqldbservice.getUserInfo)

   //flight booking page APIs

//Amita's code

//Admin modele
app.post('/addFlightdata',urlencodedPraser,function(req,res){

    var coll = db.collection('flightsData');

    console.log(req);
    console.log(req.body.duration);

    var flightdata={
        duration:req.body.duration,
        costFlight:req.body.costFlight,
        destination:req.body.destination,
        source:req.body.source,
        fligtName:req.body.fligtName,
        srcIata:req.body.srcIata,
        time:req.body.time,
        Date:req.body.Date,
        destIata:req.body.destIata,
        Day:req.body.Day
    };
    coll.insert(flightdata,function(err,result){
        if(err){
            console.log('error: '+err);
        }
        console.log('record inserted');
        //result.code = "200";
        //result.value = "Success insertion";
        status=2;
        console.log("Data inserted successfully");
    });
    res.json({staus:status});
});

//update flight data
app.post('/updateFlightdata',urlencodedPraser,function(req,res){

    var coll = db.collection('flightsData');
    var flightid={_id:ObjectId(req.body.flight_id)};
    var flightdata={$set:
        {
            duration: req.body.duration,
            costFlight: req.body.costFlight,
            destination: req.body.destination,
            source: req.body.source,
            fligtName: req.body.fligtName,
            srcIata: req.body.srcIata,
            time: req.body.time,
            Date: req.body.Date,
            destIata: req.body.destIata,
            Day: req.body.Day
        }
    };
    coll.update(flightid,flightdata,function(err,result){
        if(err){
            console.log('error: '+err);
        }
        console.log('record inserted');
        //result.code = "200";
        //result.value = "Success insertion";
        status=2;
        console.log("Data inserted successfully");
    });
    res.json({staus:status});
});

//update user account

app.post('/updateUserAccount',urlencodedPraser,function(req,res){
    var updateUser="update userinfo set firstname='" +req.body.firstname +"',"+
        "lastname='"+req.body.lastname+ "',password='"+ req.body.password +"',address='"+req.body.address +"',city='"+req.body.city+
        " ',state='"+req.body.state+"',  zipcode="+req.body.zipcode+",phone='"+req.body.phone+"',  image='"+req.body.image+"'";
    console.log("Query is:"+updateUser );
    var status=0;
    var result;

    mysqldbservice.insertData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            status=2;
            console.log("Data inserted successfully");
        }
    },updateUser);
    res.json({staus:status});
});

app.get('/userinfo',urlencodedPraser,function(req,res){
    var selectUser="select * from userinfo";
    console.log("Query is:"+selectUser );
    var status=0;
    var result;

    var data=mysqldbservice.getUserInfo(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            status=2;
            //console.log("Data inserted successfully");
        }
    },selectUser);
    console.log("data:"+data)
    res.json({staus:status});
});
