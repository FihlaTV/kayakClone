var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mysqldbservice = require('./mysql/mysql-services');
var mysql = require('mysql');
var ObjectId = require('mongodb').ObjectID;
var urlencodedPraser = bodyParser.urlencoded({ extended: false });
var status;
var auth = require('passport-local-authenticate');
var rn = require('random-number');
var path = require('path');
var routes = require('./routes');
var session = require('client-sessions');
var hotels = require('./javascript/hotels');
var flights = require('./javascript/flights');
var cars = require('./javascript/cars');
var payment = require('./javascript/hotel-payment');
var loginRegister = require('./javascript/login-register');
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(
  session({
    cookieName: 'session',
    secret: 'cmpe273kayak',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);

// MOngo Connection

app.listen(3001, function() {
  console.log('listening on 3001');
});

var db;
MongoClient.connect(
  'mongodb://kayak:kayak273@ds259175.mlab.com:59175/kayak',
  (err, database) => {
    // ... start the server
    if (err) return console.log(err);
    db = database;
  }
);

//FLIGHT APIs

//nidhi apis
app.get('/', routes.index);
app.get('/account', routes.account);
app.post('/hotelSearch', hotels.hotelSearch);
app.post('/flightSearch', flights.flightSearch);
app.post('/carSearch', cars.carSearch);
app.post('/login', loginRegister.login);
app.post('/bookHotel', hotels.bookHotel);
app.get('/hotelPayment', routes.hotelPayment);
app.post('/loadBookHotel', payment.loadBookHotel);

app.get('/list', (req, res) => {
  // var cursor = db.collection('quotes').find()
  db
    .collection('flightsData')
    .find()
    .toArray(function(err, results) {
      console.log(results);
      // send HTML file populated with quotes here
    });
});

app.get('/details', (req, res) => {
  // var cursor = db.collection('quotes').find()
  db.collection('flightsData').findOne({
    destination: 'Boston',
    Date: '2017-11-01',
    source: 'Phoenix',
    fligtName: 'Virgin America'
  }, function(err, results) {
    console.log(results);
    console.log(results._id);
  });
});

//app.get('/userinfo',mysqldbservice.getUserInfo)

//flight booking page APIs

//Amita's code

//Admin modele
app.post('/addFlightdata', urlencodedPraser, function(req, res) {
  var coll = db.collection('flightsData');

  console.log(req);
  console.log(req.body.duration);

  var flightdata = {
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
  };
  coll.insert(flightdata, function(err, result) {
    if (err) {
      console.log('error: ' + err);
    }
    console.log('record inserted');
    //result.code = "200";
    //result.value = "Success insertion";
    status = 2;
    console.log('Data inserted successfully');
  });
  res.json({ staus: status });
});

//update flight data
app.post('/updateFlightdata', urlencodedPraser, function(req, res) {
  var coll = db.collection('flightsData');
  var flightid = { _id: ObjectId(req.body.flight_id) };
  var flightdata = {
    $set: {
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
  coll.update(flightid, flightdata, function(err, result) {
    if (err) {
      console.log('error: ' + err);
    }
    console.log('record inserted');
    //result.code = "200";
    //result.value = "Success insertion";
    status = 2;
    console.log('Data inserted successfully');
  });
  res.json({ staus: status });
});

//update user account by admin

app.post('/updateUserAccount', urlencodedPraser, function(req, res) {
  var updateUser =
    "update userinfo set firstname='" +
    req.body.firstname +
    "'," +
    "lastname='" +
    req.body.lastname +
    "',address='" +
    req.body.address +
    "',city='" +
    req.body.city +
    " ',state='" +
    req.body.state +
    "',  zipcode=" +
    req.body.zipcode +
    ",phone='" +
    req.body.phone +
    "',  image='" +
    req.body.image +
    "' where email='" +
    req.body.email +
    "'";
  console.log('Query is:' + updateUser);
  var status = 0;
  var result;

  mysqldbservice.insertData(function(err, results) {
    if (err) {
      throw err;
    } else {
      status = 2;
      console.log('Data inserted successfully');
    }
  }, updateUser);
  res.json({ staus: status });
});

findflightsCached = function(
  db,
  redis,
  source1,
  destination1,
  date1,
  callback
) {
  redis.hgetall('data', function(err, reply) {
    if (reply) callback(JSON.parse(reply));
    else {
      db
        .collection('flightsData')
        .find({
          source: source1,
          destination: destination1,
          Date: date1
        })
        .toArray(function(err, doc) {
          redis.hmset(
            'data',
            'source',
            source1,
            'destination',
            destination1,
            'date',
            date1,
            JSON.stringify(doc),
            function() {
              console.log(doc);
              callback(doc);
            }
          );
        });
    }
  });
};

app.post('/searchFlightsWithCaching', function(req, res) {
  var source1 = req.body.source;
  var destination1 = req.body.destination;
  var date1 = req.body.date;
  console.log(destination1);
  findflightsCached(db, redis, source1, destination1, date1, function(book) {
    res.status(200).send(book);
  });
});

///////

findflightsCached = function(
  db,
  redis,
  source1,
  destination1,
  date1,
  callback
) {
  redis.hgetall('data', function(err, reply) {
    if (reply) callback(JSON.parse(reply));
    else {
      db
        .collection('flightsData')
        .find({
          source: source1,
          destination: destination1,
          Date: date1
        })
        .toArray(function(err, doc) {
          redis.hmset(
            'data',
            'source',
            source1,
            'destination',
            destination1,
            'date',
            date1,
            JSON.stringify(doc),
            function() {
              console.log(doc);
              callback(doc);
            }
          );
        });
    }
  });
};

app.post('/searchFlightsWithCaching', function(req, res) {
  var source1 = req.body.source;
  var destination1 = req.body.destination;
  var date1 = req.body.date;
  console.log(destination1);
  findflightsCached(db, redis, source1, destination1, date1, function(book) {
    res.status(200).send(book);
  });
});

//add new user - signup

app.post('/addUserAccount', urlencodedPraser, function(req, res) {
  var password = '';
  auth.hash(req.body.password, function(err, hashed) {
    password = hashed.hash;

    var addUser =
      "insert into userinfo(email,firstname,lastname,password,address,city,state,zipcode,phone,image) values('" +
      req.body.email +
      "','" +
      req.body.firstname +
      "','" +
      req.body.lastname +
      "','" +
      password +
      "','" +
      req.body.address +
      "','" +
      req.body.city +
      " ','" +
      req.body.state +
      "'," +
      req.body.zipcode +
      ",'" +
      req.body.phone +
      "','" +
      req.body.image +
      "')";
    console.log('Query is:' + addUser);
    var status = 0;
    var result;

    mysqldbservice.insertData(function(err, results) {
      if (err) {
        throw err;
      } else {
        status = 2;
        console.log('Data inserted successfully');
      }
    }, addUser);
  });
  res.json({ staus: status });
});

//get user info
app.get('/userinfo', urlencodedPraser, function(req, res) {
  var selectUser = 'select * from userinfo';
  console.log('Query is:' + selectUser);
  var status = 0;
  var result;

  var data = mysqldbservice.getUserInfo(function(err, results) {
    if (err) {
      throw err;
    } else {
      console.log('data:' + results);
      status = 2;
      //console.log("Data inserted successfully");
    }
  }, selectUser);
  console.log('data:' + data);
  res.json({ staus: status });
});

//flight booking

app.post('/addBookingDetails', urlencodedPraser, function(req, res) {
  var options = {
    min: 0,
    max: 10000,
    integer: true
  };
  var trip_id = rn(options);
  console.log(trip_id);
  var saveUser;
  for (var i = 0; i < req.body.passenger_details.length; i++) {
    saveUser =
      'insert into flightbookingdetails( email , tripid ,  flightsource ,  flightdestination ,  flightbaseprice ,  flighttotalprice ,' +
      '  flightpassengerdateofbirth ,  flightpassengerfirstname ,  flightpassengerlastname ,  flightpassengergender ,  journeydate ,  flightid ,  airlines ,' +
      "  flightclass  ) values('" +
      req.body.email +
      "','" +
      trip_id +
      "','" +
      req.body.flight.flightsource +
      "','" +
      req.body.flight.flightdestination +
      "','" +
      req.body.flight.flightbaseprice +
      "','" +
      req.body.totalamount +
      "','" +
      req.body.passenger_details[i].flightpassengerdateofbirth +
      "','" +
      req.body.passenger_details[i].flightpassengerfirstname +
      "','" +
      req.body.passenger_details[i].flightpassengerlastname +
      "','" +
      req.body.passenger_details[i].flightpassengergender +
      "','" +
      req.body.journeydate +
      "','" +
      req.body.flight.flightid +
      "','" +
      req.body.flight.airlines +
      "','" +
      req.body.flightclass +
      "')";

    console.log('Query is:' + saveUser);
    status = 0;

    mysqldbservice.insertData(function(err, results) {
      if (err) {
        throw err;
      } else {
        status = 2;
        console.log('Data inserted successfully');
      }
    }, saveUser);
  }

  var saveTripdata =
    "insert into tripdetails values('" +
    trip_id +
    "','" +
    req.body.email +
    "','" +
    req.body.bookingtype +
    "'," +
    req.body.totalamount +
    ",'" +
    new Date().getDate().toString() +
    "')";
  mysqldbservice.insertData(function(err, results) {
    if (err) {
      throw err;
    } else {
      status = 2;
      console.log('Data inserted successfully');
    }
  }, saveTripdata);

  res.json({ staus: status });
});

//get ticket details
app.post('/getFlightTicket', urlencodedPraser, function(req, res) {
  var selectUser =
    'select td.tripid,td.totalamount,td.bookeddate,td.email,' +
    'fbk.flightsource,fbk.flightdestination,fbk.flightbaseprice,fbk.flightpassengerdateofbirth,fbk.flightpassengerfirstname,fbk.flightpassengerlastname,' +
    'fbk.flightpassengergender, fbk.journeydate,fbk.airlines,fbk.flightclass from tripdetails td ' +
    "inner join flightbookingdetails fbk on fbk.tripid=td.tripid where td.tripid='" +
    req.body.tripid +
    "'";
  console.log('Query is:' + selectUser);
  var status = 0;
  var result;

  var data = mysqldbservice.getUserInfo(function(err, results) {
    if (err) {
      throw err;
    } else {
      console.log('data:' + results);
      status = 2;
      //console.log("Data inserted successfully");
    }
  }, selectUser);
  console.log('data:' + data);
  res.json({ staus: status });
});

//get Hotel receipt
app.post('/getHotelTicket', urlencodedPraser, function(req, res) {
  var selectUser =
    'select * from tripdetails td ' +
    "inner join hotelbookingdtails hbk on hbk.tripid=td.tripid where td.tripid='" +
    req.body.tripid +
    "'";
  console.log('Query is:' + selectUser);
  var status = 0;
  var result;

  var data = mysqldbservice.getUserInfo(function(err, results) {
    if (err) {
      throw err;
    } else {
      console.log('data:' + results);
      status = 2;
      //console.log("Data inserted successfully");
    }
  }, selectUser);
  console.log('data:' + data);
  res.json({ staus: status });
});
