var express = require('express');
const bodyParser= require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysqldbservice = require('./mysql/mysql-services');
var mysql = require('mysql');
var ObjectId = require('mongodb').ObjectID;
var urlencodedPraser=bodyParser.urlencoded({extended:false});
var status;
//var auth = require('passport-local-authenticate');
//var rn = require('random-number');

var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

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

 //List of all flights without any search parameters... Do not use this when user searches flights...
  app.get('/listofflights', (req, res) => {
    db.collection('flightsData').find().toArray(function(err, results) {
        console.log(results)
       
      })
  })


//Api and function for searching flights according to source, destination for a particular date with redis caching

findflightsCached = function (db, redis, source1,destination1,date1, callback) {
    redis.hgetall("data", function (err, reply) {
       if (reply) 
        callback(JSON.parse(reply));
        else {
                db.collection('flightsData').find({
                "source": source1,
                "destination" : destination1,
                "Date": date1
            }).toArray(function (err, doc) {
                
                    redis.hmset("data","source",source1,"destination",destination1,"date",date1, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });

            }) 
        }
    });
};

app.post('/searchFlightsWithCaching', function (req, res) {
    
     var source1 = req.body.source;
     var destination1 = req.body.destination;
     var date1= req.body.date;
     console.log(destination1);
     findflightsCached(db, redis, source1,destination1,date1, function (book) {
             
             res.status(200).send(book);
         });
     
 });


//Api and function for searching hotels according to roomtype and hoteladdress with redis caching
   findhotelsCached = function (db, redis, roomtype1,hoteladdress1, callback) {
    redis.hgetall("hotelsearchdata", function (err, reply) {
       if (reply) 
        callback(JSON.parse(reply));
        else {
                db.collection('hotels').find({
                "roomtype": roomtype1,
                "hoteladdress" : hoteladdress1
            }).toArray(function (err, doc) {
                
                    redis.hmset("hotelsearchdata","roomtype",roomtype1,"hoteladdress",hoteladdress1, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });

            }) 
        }
    });
};

app.post('/searchHotelsWithCaching', function (req, res) {
    
     var roomtype1 = req.body.roomtype;
     var hoteladdress1 = req.body.hoteladdress;
    
     findhotelsCached(db, redis, roomtype1,hoteladdress1, function (hotelnames) {
             
             res.status(200).send(hotelnames);
         });
     
 });







//Api and function for searching flights according to airlines,source, destination for a particular date with redis caching
   flightsDetailsCached = function (db, redis, source1,destination1,date1,flightname1, callback) {
    redis.hgetall("data1", function (err, reply) {
       if (reply)
        callback(JSON.parse(reply));
        else {
            
            db.collection('flightsData').findOne({
                "source": source1,
                "destination" : destination1,
                "Date": date1,
                "fligtName": flightname1
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.hmset("data1","source",source1,"destination",destination1,"date",date1,"flightname",flightname1, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });

               }
            });
        }
    });
};


app.post('/FlightsDetailsWithCaching', function (req, res) {
    
     var source1 = req.body.source;
     var destination1 = req.body.destination;
     var date1= req.body.date;
     var flightname1 = req.body.flightname;
     console.log(destination1);
     flightsDetailsCached(db, redis, source1,destination1,date1,flightname1, function (book) {
             
             res.status(200).send(book);
     
         var coll = db.collection('analytics');
         var flightdata={
             flightsource:book.source,
             flightdestination:book.destination,
           
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
            });

 //});



 //Api and function for searching hotels according to address, roomtype and hotelname with redis caching
 hotelsDetailsCached = function (db, redis, roomtype1,hoteladdress1,hotelname1, callback) {
    redis.hgetall("hoteldata2", function (err, reply) {
       if (reply)
        callback(JSON.parse(reply));
        else {
            
            db.collection('hotels').findOne({
                "roomtype": roomtype1,
                "hoteladdress" : hoteladdress1,
                "hotelname": hotelname1
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.hmset("hoteldata2","roomtype",roomtype1,"hoteladdress",hoteladdress1,"hotelname",hotelname1, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });

               }
            });
        }
    });
};

app.post('/hotelsDetailsWithCaching', function (req, res) {
    
     var roomtype1 = req.body.roomtype;
     var hoteladdress1 = req.body.hoteladdress;
     var hotelname1= req.body.hotelname;
    
     //console.log(destination1);
     hotelsDetailsCached(db, redis, roomtype1,hoteladdress1,hotelname1, function (book) {
             
             res.status(200).send(book);
             
             var roomtype_analytics=book.roomtype
             console.log(roomtype_analytics)

var coll = db.collection('analytics');
    var hoteldata={
        hotelname:book.hotelname,
        hoteladdress:book.hoteladdress,
      
    };
    coll.insert(hoteldata,function(err,result){
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
     
 });




//Api and function for searching cars according to cartype and pickupcity with redis caching

   findcarsCached = function (db, redis, cartype1,pickupcity1, callback) {
    redis.hgetall("carsearchdata", function (err, reply) {
       if (reply) 
        callback(JSON.parse(reply));
        else {
                db.collection('cars').find({
                "cartype": cartype1,
                "pickupcity" : pickupcity1
            }).toArray(function (err, doc) {
                
                    redis.hmset("carsearchdata","cartype",cartype1,"pickupcity",pickupcity1, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });

            }) 
        }
    });
};

app.post('/searchCarsWithCaching', function (req, res) {
    
     var cartype1 = req.body.cartype;
     var pickupcity1 = req.body.pickupcity;
    
     findcarsCached(db, redis, cartype1,pickupcity1, function (carnames) {
             
             res.status(200).send(carnames);
         });
     
 });



   //Api and function for searching cars according to cartype, carbrand, pickupcity with redis caching

   carsDetailsCached = function (db, redis, cartype1,pickupcity1,carbrand1, callback) {
    redis.hgetall("cardata2", function (err, reply) {
       if (reply)
        callback(JSON.parse(reply));
        else {
            
            db.collection('cars').findOne({
                "cartype": cartype1,
                "pickupcity" : pickupcity1,
                "carbrand": carbrand1
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.hmset("cardata2","cartype",cartype1,"pickupcity",pickupcity1,"carbrand",carbrand1, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });

               }
            });
        }
    });
};

app.post('/carsDetailsWithCaching', function (req, res) {
    
     var cartype1 = req.body.cartype;
     var pickupcity1 = req.body.pickupcity;
     var carbrand1= req.body.carbrand;
    
    // console.log(destination1);
     carsDetailsCached(db, redis, cartype1,pickupcity1,carbrand1, function (book1) {
             
             res.status(200).send(book1);
       
     
         var coll = db.collection('analytics');
         var cardata={
             carbrand:book1.carbrand,
             carcity:book1.pickupcity,
           
         };
         coll.insert(cardata,function(err,result){
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
            });

 //});

 
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
//salauni 
//admin API for adding hotels
app.post('/addHoteldata',urlencodedPraser,function(req,res){
    
        var coll = db.collection('hotels');
    
        console.log(req);
        console.log(req.body.duration);
    
        var hoteldata={ 
        "hotelid": req.body.hotelid,
        "hotelname": req.body.hotelname,
        "roomtype": req.body.roomtype,
        "hoteladdress": req.body.hoteladdress,
        "availablerooms": req.body.availablerooms,
        "noofguestsperroom": req.body.noofguestsperroom,
        "hotelbaseprice": req.body.hotelbaseprice,
        "hoteltotalprice": req.body.hoteltotalprice
        };
        coll.insert(hoteldata,function(err,result){
            if(err){
                console.log('error: '+err);
            }
            console.log('record inserted');
            
            status=2;
            console.log("Data inserted successfully");
        });
        res.json({staus:status});
    });
    
//salauni 
//admin API for adding cars
app.post('/addCardata',urlencodedPraser,function(req,res){
    
        var coll = db.collection('cars');
    
        console.log(req);
       
    
        var cardata= { 
            "carid": req.body.carid,
            "cartype": req.body.cartype,
            "carbrand": req.body.carbrand,
            "carbaseprice": req.body.carbaseprice,
            "cartotalprice": req.body.cartotalprice,
            "pickupcity": req.body.pickupcity,
            "pickupaddress": req.body.pickupaddress
         };
        coll.insert(cardata,function(err,result){
            if(err){
                console.log('error: '+err);
            }
            console.log('record inserted');
            
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

//salauni
// Admin API for updating hotels
app.post('/updateHoteldata',urlencodedPraser,function(req,res){
    
        var coll = db.collection('hotels');
        var hotelid={_id:ObjectId(req.body.hotelid)};
        var hoteldata={$set:
            {
                "hotelname": req.body.hotelname,
                "roomtype": req.body.roomtype,
                "hoteladdress": req.body.hoteladdress,
                "availablerooms": req.body.availablerooms,
                "noofguestsperroom": req.body.noofguestsperroom,
                "hotelbaseprice": req.body.hotelbaseprice,
                "hoteltotalprice": req.body.hoteltotalprice
               
            }
        };
        coll.update(hotelid,hoteldata,function(err,result){
            if(err){
                console.log('error: '+err);
            }
            console.log('record updated');
           
            status=2;
            console.log("Data updated successfully");
        });
        res.json({staus:status});
    });
    
// Admin API for updating cars
app.post('/updateCardata',urlencodedPraser,function(req,res){
    
        var coll = db.collection('cars');
        var carid={_id:ObjectId(req.body.carid)};
        var cardata={$set:
            {
                "cartype": req.body.cartype,
                "carbrand": req.body.carbrand,
                "carbaseprice": req.body.carbaseprice,
                "cartotalprice": req.body.cartotalprice,
                "pickupcity": req.body.pickupcity,
                "pickupaddress": req.body.pickupaddress
            }
        };
        coll.update(carid,cardata,function(err,result){
            if(err){
                console.log('error: '+err);
            }
            else
            {
            console.log('record updated');
           
            status=2;
            console.log("Data updated successfully");
        }
        });
        res.json({staus:status});
    });


//update user account by admin

app.post('/updateUserAccount',urlencodedPraser,function(req,res){
    var updateUser="update userinfo set firstname='" +req.body.firstname +"',"+
        "lastname='"+req.body.lastname+ "',address='"+req.body.address +"',city='"+req.body.city+
        " ',state='"+req.body.state+"',  zipcode="+req.body.zipcode+",phone='"+req.body.phone+"',  image='"+req.body.image+"' where email='"+req.body.email+"'";
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

//add new user - signup

app.post('/addUserAccount',urlencodedPraser,function(req,res){
    var password="";
    auth.hash(req.body.password, function(err, hashed) {
        password=hashed.hash;

    var addUser="insert into userinfo(email,firstname,lastname,password,address,city,state,zipcode,phone,image) values('"+req.body.email+"','" +
        req.body.firstname +"','"+req.body.lastname+ "','"+password+"','"+req.body.address +"','"+req.body.city+
        " ','"+req.body.state+"',"+req.body.zipcode+",'"+req.body.phone+"','"+req.body.image+"')";
    console.log("Query is:"+addUser );
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
    },addUser);
    });
    res.json({staus:status});
});

//get user info
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
            console.log("data:"+results)
            status=2;
            //console.log("Data inserted successfully");
        }
    },selectUser);
    console.log("data:"+data)
    res.json({staus:status});
});

//flight booking

app.post('/addBookingDetails',urlencodedPraser,function(req,res){

    var options = {
        min:  0,
        max:  10000,
        integer: true
    }
    var trip_id = rn(options);
    console.log(trip_id);
    var saveUser;
    for(var i=0;i<req.body.passenger_details.length;i++) {
        saveUser = "insert into flightbookingdetails( email , tripid ,  flightsource ,  flightdestination ,  flightbaseprice ,  flighttotalprice ," +
            "  flightpassengerdateofbirth ,  flightpassengerfirstname ,  flightpassengerlastname ,  flightpassengergender ,  journeydate ,  flightid ,  airlines ," +
            "  flightclass  ) values('" +
            req.body.email + "','" + trip_id + "','" + req.body.flight.flightsource + "','" +
            req.body.flight.flightdestination + "','" + req.body.flight.flightbaseprice + "','" + req.body.totalamount + "','" + req.body.passenger_details[i].flightpassengerdateofbirth + "','" +
            req.body.passenger_details[i].flightpassengerfirstname + "','" + req.body.passenger_details[i].flightpassengerlastname + "','" + req.body.passenger_details[i].flightpassengergender+ "','" + req.body.journeydate + "','" +
            req.body.flight.flightid + "','" + req.body.flight.airlines + "','" + req.body.flightclass + "')";




        console.log("Query is:" + saveUser);
        status = 0;

        mysqldbservice.insertData(function (err, results) {
            if (err) {
                throw err;
            }
            else {
                status = 2;
                console.log("Data inserted successfully");
            }
        }, saveUser);
    }

    var saveTripdata="insert into tripdetails values('"+trip_id+"','"+req.body.email+"','"+req.body.bookingtype+"',"+req.body.totalamount+",'"+new Date().getDate().toString()+"')"
    mysqldbservice.insertData(function (err, results) {
        if (err) {
            throw err;
        }
        else {
            status = 2;
            console.log("Data inserted successfully");
        }
    }, saveTripdata);

    res.json({staus:status});
});


//salauni
//hotel booking API

app.post('/hotelBookingDetails',urlencodedPraser,function(req,res){
    
        var options = {
            min:  0,
            max:  10000,
            integer: true
        }
        var trip_id = rn(options);
        console.log(trip_id);
        var saveUser;
     
            
    saveUser = " INSERT INTO hotelbookingdetails (`email`, `tripid`, `hotelname`, `roomtype`, `hoteladdress`, `checkindate`, `checkoutdate`, `noofguests`, `hotelbaseprice`, `hoteltotalprice`) VALUES ( '" +
req.body.email + "','" + trip_id + "','" + req.body.hotel.hotelname + "','" + req.body.hotel.roomtype + "','" + req.body.hotel.hoteladdress + "','" + req.body.checkindate + "','" + req.body.checkoutdate + "','" +
req.body.noofguests + "','" + req.body.hotelbaseprice + "','" + req.body.hoteltotalprice + "' ) ";

            console.log("Query is:" + saveUser);
            status = 0;
    
            mysqldbservice.insertData(function (err, results) {
                if (err) {
                    throw err;
                }
                else {
                    status = 2;
                    console.log("Data inserted successfully");
                }
            }, saveUser);
        
    
        var saveTripdata="insert into tripdetails values('"+trip_id+"','"+req.body.email+"','"+req.body.bookingtype+"',"+req.body.hoteltotalamount+",'"+new Date().getDate().toString()+"')"
        mysqldbservice.insertData(function (err, results) {
            if (err) {
                throw err;
            }
            else {
                status = 2;
                console.log("Data inserted successfully");
            }
        }, saveTripdata);
    
        res.json({staus:status});
    });
    
    
//car booking API

app.post('/carBookingDetails',urlencodedPraser,function(req,res){
    
        var options = {
            min:  0,
            max:  10000,
            integer: true
        }
        var trip_id = rn(options);
        console.log(trip_id);
        var saveUser;
     
            

saveUser = " INSERT INTO carbookingdetails (`email`, `tripid`, `carid`, `pickupdate`, `dropoffdate`, `carbaseprice`, `cartotalprice`, `caruserfirstname`, `caruserlastname`, `pickupcity`, `dropoffcity`) VALUES ( '" +
req.body.email + "','" + trip_id + "','" + req.body.car.carid + "','" + req.body.pickupdate + "','" + req.body.dropoffdate + "','"+ req.body.carbaseprice + "','" + req.body.cartotalprice + "','"+ req.body.caruserfirstname + "','" + req.body.caruserlastname + "','"+ req.body.pickupcity + "','" + req.body.dropoffcity + "'  );";

            console.log("Query is:" + saveUser);
            status = 0;
    
            mysqldbservice.insertData(function (err, results) {
                if (err) {
                    throw err;
                }
                else {
                    status = 2;
                    console.log("Data inserted successfully");
                }
            }, saveUser);
      
    
        var saveTripdata="insert into tripdetails values('"+trip_id+"','"+req.body.email+"','"+req.body.bookingtype+"',"+req.body.cartotalamount+",'"+new Date().getDate().toString()+"')"
        mysqldbservice.insertData(function (err, results) {
            if (err) {
                throw err;
            }
            else {
                status = 2;
                console.log("Data inserted successfully");
            }
        }, saveTripdata);
    
        res.json({staus:status});
    });
    




//get ticket details
app.post('/getFlightTicket',urlencodedPraser,function(req,res){
    var selectUser="select td.tripid,td.totalamount,td.bookeddate,td.email," +
        "fbk.flightsource,fbk.flightdestination,fbk.flightbaseprice,fbk.flightpassengerdateofbirth,fbk.flightpassengerfirstname,fbk.flightpassengerlastname," +
        "fbk.flightpassengergender, fbk.journeydate,fbk.airlines,fbk.flightclass from tripdetails td " +
        "inner join flightbookingdetails fbk on fbk.tripid=td.tripid where td.tripid='"+req.body.tripid+"'";
    console.log("Query is:"+selectUser );
    var status=0;
    var result;

    var data=mysqldbservice.getUserInfo(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            console.log("data:"+results)
            status=2;
            //console.log("Data inserted successfully");
        }
    },selectUser);
    console.log("data:"+data)
    res.json({staus:status});
});

//get Hotel receipt
app.post('/getHotelTicket',urlencodedPraser,function(req,res){
    var selectUser="select * from tripdetails td " +
        "inner join hotelbookingdtails hbk on hbk.tripid=td.tripid where td.tripid='"+req.body.tripid+"'";
    console.log("Query is:"+selectUser );
    var status=0;
    var result;

    var data=mysqldbservice.getUserInfo(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            console.log("data:"+results)
            status=2;
            //console.log("Data inserted successfully");
        }
    },selectUser);
    console.log("data:"+data)
    res.json({staus:status});
});

//get car booking receipt
app.post('/getCarreceipt',urlencodedPraser,function(req,res){
    var selectUser="select * from tripdetails td " +
        "inner join carbookingdetails car on car.tripid=td.tripid where td.tripid='"+req.body.tripid+"'";
    console.log("Query is:"+selectUser );
    var status=0;
    var result;

    var data=mysqldbservice.getUserInfo(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            console.log("data:"+results)
            status=2;
        }
    },selectUser);
    console.log("data:"+data)
    res.json({staus:status});
});

//This API will send list of all the flighs/cars/hotels that the user will search each time
app.get('/analytics', (req, res) => {
    db.collection('analytics').find().toArray(function(err, results) {
        console.log(results)
        //res.json({staus:status});
        res.send(results)
       
       
      })
  })