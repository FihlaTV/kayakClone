import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { post } from 'axios';
import jwt from 'jsonwebtoken';

export function setUsername(uname) {
    return {
        type : "USERNAME",
        payload:uname
    }
}
export function setPassword(pass) {
    return {
        type : "PASSWORD",
        payload:pass
    }
}

export function validateUser(uname,pass) {
    console.log("uname"+uname);

    return function(dispatch){
        fetch("http://localhost:3001/login",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({username:uname,password:pass})
            
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "LOGIN",
                   payload: data.result
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function signUpUser(fname,lname,uname,pass,email) {
    console.log("fname:"+fname);
    console.log("lname:"+lname);
    console.log("uname:"+uname);
    console.log("email:"+email);
    console.log("pass:"+pass);

    return function(dispatch){
        axios.post("http://localhost:5001/api/signUp",{
            fname,lname,uname,pass,email
        })
        .then(function(response){
            console.log("response: "+response.data.status);
            dispatch({type : "SIGNUP", payload:response.data.status})})
        .catch(function(err){
            console.log(err);
        });
    }
}

export function uploadDocumentRequest(file, file_id,folder_name,flag ) {  
  console.log("name:"+file_id)
  console.log("file:"+folder_name)
  var data = new FormData();
  data.append('file', file);
  data.append('name', file_id);
  data.append('parent_available', flag);
  data.append('folder_name', folder_name);



   return function(dispatch) {
    fetch('http://localhost:5001/api/upload',{
        mode: 'no-cors',
     method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: data})
     .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "UPLOAD_DOCUMENT_SUCCESS",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
  }
}

export function logOut(file, name ) {  
    return function(dispatch){
        fetch("http://localhost:5001/api/logout",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include'    
        })
        //.then(res => res.json())
        .then(data => 
            dispatch({
                   type: "LOGOUT",
                   payload: data.result
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export function GetFiles() {

    return function(dispatch){
        fetch("http://localhost:3001/list",{    //API name to be changed
            method:"GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include'
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}
export function GetFlightDetails(flight_id) {
    console.log("file_id:"+flight_id);

    return function(dispatch){
        fetch("http://localhost:3001/flightdetails",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({flight_id:flight_id})
        })
            .then(res => res.json())
    .then(data =>


        dispatch({
            type: "FLIGHTDATA",
            payload: data.flightdata
        })

    )
    .catch(function(err){
            console.log(err);
        });
    }
}

export function update_flight(flight_id,duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day) {

    console.log("flight_id"+flight_id);
    console.log("duration"+duration);
    console.log("costFlight"+costFlight);
    console.log("destination"+destination);
    console.log("source"+source);
    console.log("fligtName"+fligtName);

    console.log("srcIata"+srcIata);
    console.log("time"+time);
    console.log("Date"+Date);
    console.log("destIata"+destIata);
    console.log("Day"+Day);

    return function(dispatch){
        fetch("http://localhost:3001/updateFlightdata",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({flight_id:flight_id,duration:duration,costFlight:costFlight,destination:destination,source:source,
                fligtName:fligtName,srcIata:srcIata,time:time,Date:Date,destIata:destIata,Day:Day})
        })
            .then(res => res.json())
    .then(data =>

        dispatch({
            type: "STARRED1",
            payload: data.status
        })
    )
    .catch(function(err){
            console.log(err);
        });
    }
}

export function add_flight(duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day) {

    console.log("duration"+duration);
    console.log("costFlight"+costFlight);
    console.log("destination"+destination);
    console.log("source"+source);
    console.log("fligtName"+fligtName);

    console.log("srcIata"+srcIata);
    console.log("time"+time);
    console.log("Date"+Date);
    console.log("destIata"+destIata);
    console.log("Day"+Day);

    return function(dispatch){
        fetch("http://localhost:3001/addFlightdata",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({duration:duration,costFlight:costFlight,destination:destination,source:source,
                fligtName:fligtName,srcIata:srcIata,time:time,Date:Date,destIata:destIata,Day:Day})
        })
            .then(res => res.json())
    .then(data =>

        dispatch({
            type: "STARRED1",
            payload: data.status
        })
    )
    .catch(function(err){
            console.log(err);
        });
    }
}

export function GetUsers() {

    return function(dispatch){
        fetch("http://localhost:3001/userinfo",{
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
            .then(res => res.json())
    .then(data =>


        dispatch({
            type: "USERS",
            payload: data.users
        })

    )
    .catch(function(err){
            console.log(err);
        });
    }
}
export function GetTripdetails(email) {

    return function(dispatch){
        fetch("http://localhost:3001/tripdetails",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({email:email})
        })
            .then(res => res.json())
    .then(data =>


        dispatch({
            type: "TRIPDATA",
            payload: data.tripdetails
        })

    )
    .catch(function(err){
            console.log(err);
        });
    }
}

export function GetReceipt(tripid,bookingtype) {

    console.log("tripid:"+tripid+" bookingtype:"+bookingtype)
    return function(dispatch) {
        if (bookingtype === "Flight") {

        fetch("http://localhost:3001/getFlightTicket", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({tripid: tripid})
        })
            .then(res => res.json()
    )
    .
        then(data =>
        dispatch({
            type: "FLIGHTTICKET",
            payload: data.receipt
        })

    )
    .
        catch(function (err) {
            console.log(err);
        });
    }
        if (bookingtype === "Hotel") {

            fetch("http://localhost:3001/getHotelTicket", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({tripid: tripid})
            })
                .then(res => res.json()
        )
        .
            then(data =>
            dispatch({
                type: "HOTELRECEIPT",
                payload: data.hotelreceipt
            })

        )
        .
            catch(function (err) {
                console.log(err);
            });
        }
        if (bookingtype === "Car") {

            fetch("http://localhost:3001/getFlightTicket", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({tripid: tripid})
            })
                .then(res => res.json()
        )
        .
            then(data =>
            dispatch({
                type: "CARRECEIPT",
                payload: data.carreceipt
            })

        )
        .
            catch(function (err) {
                console.log(err);
            });
        }
    }
}

export function GetHotels() {

    return function(dispatch){
        fetch("http://localhost:3001/listoffhotels",{
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "ALLHOTELS",
                    payload: data.hotels
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function add_hotel(hotel_name,city,price,reviews,stars) {

    return function(dispatch){
        fetch("http://localhost:3001/addHoteldata1",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({hotel_name:hotel_name,city:city,price:price,reviews:reviews,stars:stars})
        })
            .then(res => res.json())
            .then(data =>

                dispatch({
                    type: "STARRED1",
                    payload: data.status
                })
            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function update_hotel(hotel_id,hotel_name,city,price,reviews,stars) {

    return function(dispatch){
        fetch("http://localhost:3001/updateHoteldata1",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({hotel_id:hotel_id,hotel_name:hotel_name,city:city,price:price,reviews:reviews,stars:stars})
        })
            .then(res => res.json())
            .then(data =>

                dispatch({
                    type: "STARRED1",
                    payload: data.status
                })
            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function GetHotelDetails(hotel_id) {
    console.log("file_id:"+hotel_id);

    return function(dispatch){
        fetch("http://localhost:3001/hoteldetails",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({hotel_id:hotel_id})
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "HOTELDATA",
                    payload: data.hoteldata
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function GetRevenue() {

    return function(dispatch){
        fetch("http://localhost:3001/all_revenue",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({})
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "REVENUE",
                    payload: data.revenue
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function GetTop10HotelRevenue() {

    return function(dispatch){
        fetch("http://localhost:3001/hotel_revenue_top10",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({})
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "REVENUE",
                    payload: data.revenue
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}
export function getUserDetails(email) {
console.log('email:'+email);
    return function(dispatch){
        fetch("http://localhost:3001/getuserdetails",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({email:email})
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "USERDETAILS",
                    payload: data.userinfo
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}
export function UpdateUser(email ,firstname,lastname,address,city,state,zipcode,phone) {
    console.log('email:'+email);
    return function(dispatch){
        fetch("http://localhost:3001/updateUserAccount",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({email:email,firstname:firstname,lastname:lastname,address:address,city:city,state:state,zipcode:zipcode,phone:phone})
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "USERDETAILS",
                    payload: data.status
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function GetFlights(stateName) {
    console.log('stateName:'+stateName);
    return function(dispatch){
        fetch("http://localhost:3001/getFlights",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({stateName:stateName})
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "ALLFILES",
                    payload: data.files
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function GetHotelsByCity(stateName) {
    console.log('stateName:'+stateName);
    return function(dispatch){
        fetch("http://localhost:3001/getHotelsByCity",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({stateName:stateName})
        })
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: "ALLHOTELS",
                    payload: data.hotels
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}