var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mysqldbservice = require('./mysql/mysql-services');
var mongoURL = "mongodb://kayak:kayak273@ds259175.mlab.com:59175/kayak";
//var kafka = require('./kafka/client');
var auth = require('passport-local-authenticate');

module.exports = function(passport) {


    passport.use('local', new LocalStrategy(function(username   , password, done) {
        try {

            console.log('passport called');

            var selectUser="select * from userinfo where email='"+username+"'";
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
                    auth.hash(password, function(err, hashed) {
                        auth.verify(password, hashed, function(err, verified) {
                            console.log(verified); // True, passwords match
                            if (verified) {
                                console.log('login found');
                                done(null,{username:username,password:hashed});
                            } else {
                                console.log('login not found');
                                done(null,false);

                            }
                            //console.log("res: "+res.code);

                        });
                    });
                    status=2;
                    //console.log("Data inserted successfully");
                }
            },selectUser);

            /*
            kafka.make_request('login_topic',{"username":username,"password":password,"topic":"login_topic"}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                    console.log('passport client: some error: '+err);
                done(err,{});
            }
            else
            {
                console.log('else called');
                if(results.code == 200){
                    done(null,{username:username,password:password});
                    console.log('passport client: login found');
                }
                else {
                    done(null,false);
                }
            }
        });
        */


/*
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('users');

                coll.findOne({username: username, password:password}, function(err, user){
                    if (user) {
                        done(null, {username: username, password: password});
                        console.log('login found')
                    } else {
                        done(null, false);
                    }
                });
            });*/
        }
        catch (e){
            done(e,{});
        }
    }));
};