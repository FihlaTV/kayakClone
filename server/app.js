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

  //app.post('/booking',mysqldbservice.putdata);


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

findBookByTitleCached = function (db, redis, Boston, callback) {
    redis.get("Philadelphia", function (err, reply) {
        if (err) callback(null);
        else if (reply) //Book exists in cache
        callback(JSON.parse(reply));
        else {
            //Book doesn't exist in cache - we need to query the main database
            db.collection('flightsData').findOne({
                source: "Philadelphia"
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.set("Philadelphia", JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};


app.get('/search1', function (req, res) {
   
    
        findBookByTitleCached(db, redis, "Philadelphia", function (book) {
            
            res.status(200).send(book);
        });
    
});




findflightsCached = function (db, redis, source,destination, callback) {
    redis.get(source,destination, function (err, reply) {
        if (err) callback(null);
        else if (reply) //Book exists in cache
        callback(JSON.parse(reply));
        else {
            //Book doesn't exist in cache - we need to query the main database
            db.collection('flightsData').findOne({
                source: source,
                destination : destination
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.set(destination, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });

                    redis.set(source, JSON.stringify(doc), function () {
                        console.log(doc);
                        callback(doc);

                    });
                }
            });
        }
    });
};




app.post('/search2', function (req, res) {
    
     var source = req.body.source;
     var destination = req.body.destination;
     console.log(destination);
     findflightsCached(db, redis, source,destination, function (book) {
             
             res.status(200).send(book);
         });
     
 });








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