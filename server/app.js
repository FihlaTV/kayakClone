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

app.use(bodyParser.json());
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


   app.get('/details', (req, res) => {
    // var cursor = db.collection('quotes').find()
     db.collection('flightsData').findOne({"destination":"Boston", "Date": "2017-11-01", "source": "Phoenix", "fligtName": "Virgin America"},function(err, results) {
         console.log(results)
         console.log(results._id)
       })
   })


   app.post('/user_cc_details',function(req,res){

    var cardnumber = req.body.cardnumber
    var cvv = req.body.cvv
    var name =req.body.name
    var expdate = req.body.expdate
    var email = req.body.email
    var ccpasscode =req.body.ccpasscode


    //var email = req.body.email;
    //var pass = req.body.password;
    console.log(req.body)
    var status=0;
    var result;
    var getCcdetails="SELECT cardnumber FROM kayak.carddetails where email='"+req.body.email+"';"

    var data=mysqldbservice.user_cc_details(function(err,results){
        if(err){
            console.log("error"+err);
        }
        else
        {
            status=200;
            console.log("resrrere"+results)
            if(results===null)
                {
                    console.log("Wrong CC details")
                    res.json({staus:null});
                }
            else{
                    console.log("test");
                    var dbcc=JSON.parse(results)[0].cardnumber
                    console.log("data:xcZ"+JSON.parse(results)[0].cardnumber);
                        if(dbcc==cardnumber){
                            res.json({staus:status});
                        }
                        else{

                        }
                }
        }
    },getCcdetails);
});


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




//ADMIN ANALYSIS - get revenue bysrc , flights only
app.post('/flight_revenue_by_src',function(req,res){
        var flightsource = req.body.flightsource
        console.log(req.body)
        var status=0;
        var result;
if (flightsource){
    var flight_revenue_by_src="SELECT flightbaseprice FROM kayak.flightbookingdetails where flightsource='" +req.body.flightsource+"'";
}
        var data=mysqldbservice.flight_revenue_by_src(function(err,results){
            if(err){
                console.log("error"+err);
            }
            else
            {
                status=200;
                console.log("data:"+results);
            }
        },flight_revenue_by_src);
        console.log("flight_revenue_by_src data for admin analysis:"+data)
        res.json({staus:status});
    });


// getcar revenue by city for admin

//ADMIN ANALYSIS - get revenue bysrc , flights only
app.post('/car_revenue_by_city',function(req,res){
    var carsource = req.body.carsource
    console.log(req.body)
    var status=0;
    var result;
if (carsource){

var car_revenue_by_city="SELECT CARTOTALPRICE FROM kayak.carbookingdetails where PICKUPCITY='" +req.body.carsource+"'";
}
    var data=mysqldbservice.car_revenue_by_city(function(err,results){
        if(err){
            console.log("error"+err);
        }
        else
        {
            status=200;
            console.log("data:"+results);
        }
    },car_revenue_by_city);
    console.log("car_revenue_by_city data for admin analysis:"+data)
    res.json({staus:status});
});


//ADMIN ANALYSIS - get HOTEL by city , HOTELS only
app.post('/hotel_revenue_by_city',function(req,res){
    var hotelsource = req.body.hotelsource
    console.log(req.body)
    var status=0;
    var result;
if (hotelsource){

var hotel_revenue_by_city="SELECT HOTELTOTALPRICE FROM kayak.HOTELBOOKINGDETAILS where HOTELADDRESS='" +req.body.hotelsource+"'";
}
    var data=mysqldbservice.hotel_revenue_by_city(function(err,results){
        if(err){
            console.log("error"+err);
        }
        else
        {
            status=200;
            console.log("data:"+results);
        }
    },hotel_revenue_by_city);
    console.log("hotel_revenue_by_city data for admin analysis:"+data)
    res.json({staus:status});
});


//ADMIN ANALYSIS -TOP 5 FLIGHTS based on revenue
app.get('/top_five_flights',function(req,res){
var result;
var top_five_flights="SELECT airlines FROM kayak.FLIGHTBOOKINGDETAILS  ORDER BY FLIGHTTOTALPRICE DESC limit 5";
    var data=mysqldbservice.top_five_flights(function(err,results){
        if(err){
            console.log("error"+err);
        }
        else
        {
            status=200;
            console.log("data:"+results);
        }
    },top_five_flights);
    console.log("top_five_flights data for admin analysis:"+data)
    res.json({staus:status});
});

//ADMIN ANALYSIS -TOP 5 CARS based on revenue
app.get('/top_five_cars',function(req,res){
    var result;
    var top_five_cars="SELECT CARID FROM kayak.CARBOOKINGDETAILS  ORDER BY CARTOTALPRICE DESC limit 5";
        var data=mysqldbservice.top_five_cars(function(err,results){
            if(err){
                console.log("error"+err);
            }
            else
            {
                status=200;
                console.log("data:"+results);
            }
        },top_five_cars);
        console.log("top_five_cars data for admin analysis:"+data)
        res.json({staus:status});
    });


//ADMIN ANALYSIS -TOP 5 HOTELS based on revenue
app.get('/top_five_hotels',function(req,res){
    var result;
    var top_five_hotels="SELECT hotelname FROM kayak.HOTELBOOKINGDETAILS  ORDER BY HOTELTOTALPRICE DESC limit 5";
        var data=mysqldbservice.top_five_hotels(function(err,results){
            if(err){
                console.log("error"+err);
            }
            else
            {
                status=200;
                console.log("data:"+results);
            }
        },top_five_hotels);
        console.log("top_five_hotels data for admin analysis:"+data)
        res.json({staus:status});
    });