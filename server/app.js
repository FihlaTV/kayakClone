var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysqldbservice = require('./mysql/mysql-services');
var mysql = require('mysql');


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

   app.get('/userinfo',mysqldbservice.getUserInfo)

   //flight booking page APIs
