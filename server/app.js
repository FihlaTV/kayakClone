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
// app.post('/hotelSearch', hotels.hotelSearch);
app.post('/flightSearch', flights.flightSearch);
app.post('/carSearch', cars.carSearch);
app.post('/login', loginRegister.login);
app.post('/register', loginRegister.register);
app.post('/bookHotel', hotels.bookHotel);
app.get('/hotelPayment', routes.hotelPayment);
app.post('/loadBookHotel', payment.loadBookHotel);
app.get('/hotelDetails', routes.hotelDetails);
// app.post('/hotelDetails', hotels.hotelDetails);
app.post('/loadHotelDetails', hotels.loadHotelDetails);
app.post('/bookFlight', flights.loadFlightDetails);
app.post('/bookHotelFinal', hotels.bookHotelFinal);
app.post('/loadFinalBookingHotel', payment.loadFinalBookingHotel);
app.post('/hotelsPaymentDetails', payment.hotelsPaymentDetails);
app.get('/flightPayment', routes.flightPayment);
app.post('/loadFlightPayment', flights.loadFlightPayment);

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

//vishnu gave a test api to check hotelsearch
//Api and function for searching hotels according to date and city with redis caching
//NOTE : This data is NOT sent for analytics

app.post('/cars', function(req, res) {
  console.log(req.body);
  var carsData = [];
  var pickupdate = req.body.start;
  var dropoffdate = req.body.end;

  var noOfDays1 = pickupdate.split(',')[0].split(' ')[1];
  var noOfDays2 = dropoffdate.split(',')[0].split(' ')[1];

  var totalDays = noOfDays2 - noOfDays1;

  var location = req.body.pickUp.split(',')[0];
  //var date = req.body.date;

  findcarsCached = function(db, redis, location, date, callback) {
    redis.hgetall('carsearchdata', function(err, reply) {
      if (reply) {
        callback(JSON.parse(reply));
        console.log('i m in redis');
      } else {
        db
          .collection('carsData')
          .find({
            location: location,
            date: pickupdate
          })
          .toArray(function(err, doc) {
            var data = doc;
            for (var i = 0; i < data.length; i++) {
              data[i].amount = parseInt(data[i].price) * parseInt(totalDays);
              console.log(data[i].amount);
              carsData.push({ Cars: data[i], noOfDays: totalDays });
            }
            redis.hmset(
              'carsearchdata',
              'location',
              location,
              'date',
              date,
              JSON.stringify(carsData),
              function() {
                console.log(carsData);
                callback(carsData);
              }
            );
          });
      }
    });
  };

  findcarsCached(db, redis, location, pickupdate, function(carsData) {
    console.log(carsData);
    // res.status(200).send(carsData);
    res.status(200).render('cars', { data: carsData });
  });
});

//vishnu sent new api email
//hotels
app.post('/hotels', function(req, res) {
  var hotelsData = [];
  console.log(req.body);
  //var roomType1 = req.body.roomType;
  var city = req.body.location.split(',')[0];
  var checkindate = req.body.start;
  var checkoutdate = req.body.end;

  var noOfDays1 = checkindate.split(',')[0].split(' ')[1];
  var noOfDays2 = checkoutdate.split(',')[0].split(' ')[1];
  var totalDays = noOfDays2 - noOfDays1;

  console.log('numbers of days stay ' + totalDays);

  findhotelsCached = function(db, redis, city, checkindate, callback) {
    redis.hgetall('hotelsearchdata', function(err, reply) {
      if (reply) {
        console.log('i m redis');

        callback(JSON.parse(reply));
      } else {
        db
          .collection('hotelsData')
          .find({
            //"roomType": roomType1,
            city: city,
            date: checkindate
          })
          .toArray(function(err, doc) {
            var data = doc;
            for (var i = 0; i < data.length; i++) {
              data[i].amount = parseInt(data[i].price) * parseInt(totalDays);
              console.log(data[i].amount);
              hotelsData.push({ Hotels: data[i], noOfDays: totalDays });
            }
            redis.hmset(
              'hotelsearchdata',
              'city',
              city,
              'date',
              checkindate,
              JSON.stringify(hotelsData),
              function() {
                // console.log(doc);
                callback(hotelsData);
              }
            );
          });
      }
    });
  };

  findhotelsCached(db, redis, city, checkindate, function(hotelsData) {
    console.log(hotelsData);
    res.status(200).render('hotels', { data: hotelsData });
  });
});

app.post('/hotelsDetails', function(req, res) {
  console.log('in  hoteldetails vishnu');
  console.log(req.body);
  var dataToSendBack = req.body;
  var hotelName = req.body.hotelName;
  var city = req.body.city;
  //var roomType = req.body.roomType;
  var date = req.body.date;
  console.log('in app.js vishnu');
  console.log(dataToSendBack);
  req.session.hotelDetailsObj = dataToSendBack;
  console.log(req.session.hotelDetailsObj);

  //console.log(destination1);
  hotelsDetailsCached = function(db, redis, city, hotelName, date, callback) {
    redis.hgetall('hoteldata2', function(err, reply) {
      if (reply) callback(JSON.parse(reply));
      else {
        db.collection('hotelsData').findOne({
          // "roomType": roomType,
          city: city,
          hotelName: hotelName,
          date: date
        }, function(err, doc) {
          if (err || !doc) callback(null);
          else {
            redis.hmset(
              'hoteldata2',
              'city',
              city,
              'hotelName',
              hotelName,
              'date',
              date,
              JSON.stringify(doc),
              function() {
                console.log(doc);
                callback(doc);
              }
            );
          }
        });
      }
    });
  };
  hotelsDetailsCached(db, redis, city, hotelName, date, function(book) {
    res.status(200).send(book);
    // res.send(200);

    // Data Pushed toanalytics Db
    var coll = db.collection('analytics');
    var hoteldata = {
      hotelname: book.hotelName,
      hotelcity: book.city
    };
    coll.insert(hoteldata, function(err, result) {
      if (err) {
        console.log('error: ' + err);
      } else {
        console.log('Hotel record inserted into Analytics Db');
        status = 2;
      }
    });

    res.status(200).send(dataToSendBack);

    // res.render('hotel-details', { hotelDetails: req.body });
    //res.json({staus:status});
  });
});

app.post('/hotelBooking', urlencodedPraser, function(req, res) {
  console.log('inside hotelbooking api vishnu');
  console.log(req.body);

  var email = req.session.email;

  var cardnumber = req.body.cardnumber;
  var cvv = req.body.cvv;
  var name = req.body.name;
  var expdate = req.body.expdate;
  // var email = email;

  var options = {
    min: 0,
    max: 10000,
    integer: true
  };
  var trip_id = rn(options);
  console.log(trip_id);
  var saveUser;

  //push to hotel booking details
  saveUser =
    " INSERT INTO hotelbookingdetails (`email`, `tripid`, `hotelname`, `hoteladdress`, `checkindate`, `checkoutdate`, `noofguests`, `hotelbaseprice`, `hoteltotalprice`) VALUES ( '" +
    email +
    "','" +
    trip_id +
    "','" +
    req.session.hotelDetailsObj.hotelName +
    "','" +
    req.session.hotelDetailsObj.location +
    "','" +
    req.session.hotelDetailsObj.date +
    "','" +
    'Dec 4, Mon' +
    "','" +
    '2' +
    "','" +
    req.session.hotelDetailsObj.price +
    "' ,'" +
    req.session.hotelDetailsObj.amount +
    "') ";

  console.log('Query is:' + saveUser);
  status = 0;

  mysqldbservice.insertData(function(err, results) {
    if (err) {
      throw err;
    } else {
      status = 2;
      console.log('Data hotelDetails inserted successfully');
    }
  }, saveUser);

  //Push Cc details
  var saveCcdata =
    "insert into carddetails (cardnumber,cvv, name, expdate, email)VALUES ('" +
    cardnumber +
    "','" +
    cvv +
    "','" +
    name +
    "','" +
    expdate +
    "','" +
    email +
    "')'";
  mysqldbservice.insertData(function(err, results) {
    if (err) {
      throw err;
    } else {
      status = 2;
      console.log('Data inserted successfully');
    }
  }, saveCcdata);

  //push toTripdetailstable
  var saveTripdata =
    "insert into tripdetails (tripid,email,bookingtype,totalamount,bookeddate) VALUES ('" +
    trip_id +
    "','" +
    email +
    "','" +
    req.session.hotelDetailsObj.roomType +
    "','" +
    req.session.hotelDetailsObj.amount +
    "','" +
    new Date().toDateString() +
    "')'";
  mysqldbservice.insertData(function(err, results) {
    if (err) {
      throw err;
    } else {
      status = 2;
      console.log('Data inserted successfully hotelDetails');
    }
  }, saveTripdata);

  res.render('success-payment', { userObj: email });
});

//flightSearch

app.post('/flights', (req, res) => {
  console.log('in /flights appjs');
  console.log(req.body);
  req.session.flightPassengers = req.body.passengers;

  var source = req.body.fromPlaceRound.split(',')[0];
  var destination = req.body.toPlaceRound.split(',')[0];
  var startDate = req.body.start[0];
  var returnDate = req.body.end;
  var noOfPass = req.body.passengers;

  var totalAmount = 0;

  var data = {
    OneWay: {},
    ReturnWay: {}
  };
  search = {
    source: source,
    destination: destination,
    date: startDate
  };
  var flightsData = [];

  db
    .collection('flightsData')
    .find(search)
    .toArray(function(err, doc) {
      data.To = doc;
      console.log('To:' + data.To);

      if (returnDate === 'none') {
        //console.log("data.To.length"+data.To.length);
        for (var i = 0; i < data.To.length; i++) {
          data.To[i].amount =
            parseInt(data.To[i].costFlight) * parseInt(noOfPass);
          console.log(data.To[i].amount);
          flightsData.push({ OneWay: data.To[i], noOfPassengers: noOfPass });
        }
        res.status(200).json({ flightdata: flightsData });
      } else {
        search = {
          source: destination,
          destination: source,
          date: returnDate
        };
        db
          .collection('flightsData')
          .find(search)
          .toArray(function(err, doc) {
            data.From = doc;
            console.log('From:' + data.From);
            for (var i = 0; i < data.To.length; i++) {
              data.To[i].amount =
                parseInt(data.To[i].costFlight) * parseInt(noOfPass);
              data.From[i].amount =
                parseInt(data.From[i].costFlight) * parseInt(noOfPass);
              totalAmount = data.To[i].amount + data.From[i].amount;
              flightsData.push({
                OneWay: data.To[i],
                ReturnWay: data.From[i],
                totalAmount: totalAmount,
                noOfPassengers: noOfPass
              });
            }

            // console.log(flightsData);
            // res.status(200).json({ flightdata: flightsData });
            console.log(flightsData);
            res.status(200).render('flights', { data: flightsData });
          });
      }
    });
});

app.post('/flightsDetails', (req, res) => {
  console.log('in  flightDetails vishnu');
  console.log(req.body);
  req.session.oneFlightObj = req.body;

  // var dataToSendBack = req.body;
  // var hotelName = req.body.hotelName;
  // var city = req.body.city;
  // //var roomType = req.body.roomType;
  // var date = req.body.date;
  // console.log('in app.js vishnu');
  // console.log(dataToSendBack);
  // req.session.hotelDetailsObj = dataToSendBack;
  // console.log(req.session.hotelDetailsObj);

  // console.log(req.body);
  var id1 = req.body.OneWay._id;
  var id2 = req.body.ReturnWay._id;
  search = {
    _id: { $in: [ObjectId(id1), ObjectId(id2)] }
  };
  //var flightsData=[];
  db
    .collection('flightsData')
    .find(search)
    .toArray(function(err, doc) {
      // console.log(doc);
      //res.status(200).json({flightdata:flightsData});
      // console.log(doc);

      /*
            //pushsearched data to analytics DB
        var coll = db.collection('analytics');

        coll.insert(doc,function(err,result){
            if(err){
                console.log('error: '+err);
            }
            console.log('Flight data record inserted for ANALYTICS');
            status=2;
        });

*/
      if (req.session.email != undefined && req.session.email != null) {
        res.send({
          status: 'session'
        });
      } else {
        res.send({
          status: 'noSession'
        });
      }
      // res.send(200);
    });
});

app.post('/flightBooking', urlencodedPraser, function(req, res) {
  var cardnumber = req.body.cardnumber;
  var cvv = req.body.cvv;
  var name = req.body.name;
  var expdate = req.body.expdate;
  var email = req.body.email;

  var totalamount = req.body.totalamount;
  //var ccpasscode =req.body.ccpasscode

  var options = {
    min: 0,
    max: 10000,
    integer: true
  };
  var trip_id = rn(options);
  console.log('flight booking' + trip_id);
  //varfinalprice=
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
      totalamount +
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
      req.body.flight.flight_id +
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

  //Pushtrip details
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
    new Date().toDateString() +
    "')";
  mysqldbservice.insertData(function(err, results) {
    if (err) {
      throw err;
    } else {
      status = 2;
      console.log('Data inserted successfully');
    }
  }, saveTripdata);

  //Push Cc details
  var saveCcdata =
    "insert into carddetails (cardnumber,cvv, name, expdate, email)VALUES ('" +
    cardnumber +
    "','" +
    cvv +
    "','" +
    name +
    "'," +
    expdate +
    ",'" +
    email +
    "')";
  mysqldbservice.insertData(function(err, results) {
    if (err) {
      throw err;
    } else {
      status = 2;
      console.log('Data inserted successfully');
    }
  }, saveCcdata);

  res.json({ staus: status });
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
